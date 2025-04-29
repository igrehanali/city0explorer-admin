"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // adjust if your firebase config is elsewhere
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface HelpRequest {
  id: string;
  createdAt: any;
  description: string;
  question: string;
  status: string;
  userEmail: string;
  userId: string;
  reply?: string;
}

const HelpPage = () => {
  const { toast } = useToast();
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>([]);
  const [replies, setReplies] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchHelpRequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "helpRequests"));
        const requests: HelpRequest[] = querySnapshot.docs.map(
          (docSnapshot) => ({
            id: docSnapshot.id,
            ...docSnapshot.data(),
          })
        ) as HelpRequest[];
        setHelpRequests(requests);
      } catch (error) {
        console.error("Error fetching help requests:", error);
      }
    };

    fetchHelpRequests();
  }, []);

  const handleReply = async (id: string) => {
    const replyText = replies[id];
    if (!replyText) {
      toast({
        title: "Reply Required",
        description: "Please enter a reply before sending.",
        variant: "destructive",
      });
      return;
    }
    try {
      await updateDoc(doc(db, "helpRequests", id), {
        reply: replyText,
        status: "replied",
      });
      toast({
        title: "Reply Sent",
        description: "Your response has been successfully sent to the user.",
      });

      setReplies((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      console.error("Error replying:", error);
      toast({
        title: "Reply Failed",
        description: "An error occurred while sending the reply.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {helpRequests.map((request) => (
        <Card key={request.id} className="flex flex-col justify-between">
          <CardHeader>
            <div className="text-sm text-muted-foreground">
              {new Date(request.createdAt.seconds * 1000).toLocaleString()}
            </div>
            <h2 className="text-lg font-semibold">{request.question}</h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm">{request.description}</p>
            <div className="text-sm font-medium">
              Status: <span className="capitalize">{request.status}</span>
            </div>
            {request.status === "pending" || request.status === "replied" ? (
              <>
                <Textarea
                  placeholder="Write a reply..."
                  value={replies[request.id] || ""}
                  onChange={(e) =>
                    setReplies((prev) => ({
                      ...prev,
                      [request.id]: e.target.value,
                    }))
                  }
                />
                <Button onClick={() => handleReply(request.id)}>
                  Send Reply
                </Button>
              </>
            ) : null}
            {request.status !== "resolved" && (
              <Button
                variant="outline"
                onClick={() => handleResolve(request.id)}
              >
                Mark as Resolved
              </Button>
            )}
            {request.reply && (
              <div className="bg-muted p-3 rounded-md text-sm">
                <strong>Admin Reply:</strong> {request.reply}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HelpPage;
