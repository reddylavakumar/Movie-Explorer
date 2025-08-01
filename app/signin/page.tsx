"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Ellipsis, Play } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/components/supabase/supabase-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/spinner/Spinner";

export default function SignInPage() {
  const signInSchema = z.object({
    email: z.email("Enter valid email address").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    remember: z.boolean().default(false),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = async (data: any) => {
    const email = data.email;
    const password = data.password;

    if (isSignUp) {
      const { error: signupError, data: signupData } =
        await supabase.auth.signUp({
          email,
          password,
        });

      console.log(signupData, "sign up data");

      if (signupError) {
        toast.error("Error While Sign Up");
        console.error(signupError.message, "error in sign up");
        return;
      }

      toast.success("Sign Up Successful");
      setIsSignUp(false);
      return;
    }

    // Sign In
    const { error: signInError, data: signInData } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    console.log(signInData, "sign in data");

    if (signInError) {
      console.error(signInError, "error in sign in");
      toast.error(signInError?.message);
      return;
    }

    toast.success("Sign In Successful");
    router.push("/dashboard");
    setDisabled(true);
    reset();
  };

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <div className="hidden lg:flex w-1/2 bg-black relative">
        <Image
          src="/spiderman.jpeg"
          alt="Sign In Background"
          fill
          // height={90}
          // width={100}
          className="object-cover opacity-90"
        />
      </div>

      {/*------------ Sign In Form------------  */}
      <div className="w-full lg:w-1/2  flex flex-col justify-center px-6 md:px-12 lg:px-24">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-10">
            <div className="flex items-center space-x-2">
              <div className="text-orange-500 text-3xl">
                <Play size={42} strokeWidth={3} />
              </div>
              <h1 className="text-white text-2xl font-semibold">
                Movie Explorer
              </h1>
            </div>
          </div>

          {/*------------  Form------------  */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-black/30 border border-white/10 rounded-lg p-8 space-y-6 text-white">
              <h2 className="text-xl font-semibold">
                {!isSignUp ? "Sign In" : "Sign Up"}
              </h2>
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="bg-black/40 text-white"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="bg-black/40 text-white"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                {!isSignUp && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" {...register("remember")} />
                      <Label htmlFor="remember">Remember me</Label>
                    </div>
                    <a href="/" className="text-orange-400 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                )}

                <Button
                  disabled={disabled}
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  {disabled ? (
                    <Spinner size="small" className="text-white" />
                  ) : !isSignUp ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </>
            </div>
          </form>
          <div className="text-center text-sm my-2 text-white/70">
            {/* or continue with */}
            {isSignUp ? "Already have an Account ?" : "Don't have account ?"}
          </div>
          <div className="bg-black/30 border border-white/10 rounded-lg p-8 space-y-6 text-white">
            <Button
              disabled={disabled}
              variant="outline"
              className="w-full flex items-center gap-2 bg-white text-black dark:text-white"
              onClick={() => setIsSignUp((prev) => !prev)}
            >
              {/* <Image src="/google.svg" alt="Google" width={20} height={20} /> */}
              {/* Google */}
              {isSignUp ? "Sign In" : "Sign Up"}
            </Button>
          </div>
        </div>

        {/* <p className="text-center text-sm text-white/60 mt-4">
          Don't have an account?{" "}
          <a href="#" className="text-orange-400 hover:underline">
            Sign up
          </a>
        </p> */}
      </div>
    </div>
  );
}
