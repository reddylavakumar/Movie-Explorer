"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/components/supabase/supabase-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UserRound } from "lucide-react";

export function ProfilePopover() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      toast.success("Signed Out Successfully");
      router.push("/");
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {/* <Button
          variant="ghost"
          className="font-medium px-4 py-2 border rounded-md hover:bg-muted hover:text-foreground transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <UserRound className="mr-2 h-4 w-4" />
          Profile
        </Button> */}
        <Button
          variant="ghost"
          className="text-black font-medium px-4 py-2 border rounded-md hover:bg-black hover:text-white transition-colors duration-200 dark:text-white dark:border-white/20"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Profile */}
          <UserRound />
          Profile
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 bg-background text-foreground border border-border rounded-xl shadow-xl p-5">
        <div className="space-y-4">
          {/* Header */}
          <div className="space-y-1">
            <h4 className="text-lg font-semibold">Your Profile</h4>
            <p className="text-sm text-muted-foreground">
              Manage your account settings
            </p>
          </div>

          {/* Profile Info */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-muted-foreground">User Name</Label>
              <span className="font-medium">Lava Kumar</span>
            </div>
          </div>

          {/* Action */}
          <div className="pt-2 border-t border-border">
            <Button
              className="w-full bg-destructive hover:bg-destructive/90 text-white transition-colors duration-200"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
