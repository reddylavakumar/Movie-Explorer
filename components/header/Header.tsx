"use client";
import { useCallback, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { CircleX, Menu, Play, SearchIcon } from "lucide-react";
import Link from "next/link";
import { ProfilePopover } from "../popover/PopOver";
import { ThemeToggle } from "../theme/theme";
import { Button } from "../ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { useTransition } from "react";
export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [menuOpen, setMenuOpen] = useState(false);
  // const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newQuery = e.target.value;
  //   const params = new URLSearchParams(searchParams.toString());
  //   if (newQuery) {
  //     params.set("query", newQuery);
  //   } else {
  //     params.delete("query");
  //   }
  //   startTransition(() => {
  //     router.push(`?${params.toString()}`);
  //   });
  // };
  const updateURL = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (query) {
        params.set("query", query);
      } else {
        params.delete("query");
      }

      startTransition(() => {
        router.push(`?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setInputValue(newQuery);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      updateURL(newQuery);
    }, 500);
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white text-black dark:bg-[#2b1b14] dark:text-white">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/" className="flex items-center gap-1.5">
            <Play size={28} className="text-orange-500" strokeWidth={3} />
            <span className="text-xl font-bold text-black dark:text-white">
              Streamr
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {["Home", "Series", "Movies", "New & Popular", "My List"].map(
              (label, index) => (
                <Link
                  key={index}
                  href="/"
                  className="hover:text-muted-foreground transition-colors"
                >
                  {label}
                </Link>
              )
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <div className="relative hidden md:block max-w-md w-64">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10 pr-10 bg-white text-black dark:bg-[#3a2a21] dark:border-none dark:text-white placeholder:text-gray-400 rounded-md"
              placeholder="Search"
              value={inputValue}
              onChange={handleChange}
            />
            {inputValue?.length > 0 && (
              <CircleX
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-500 transition"
                onClick={() => {
                  setInputValue("");
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete("query");

                  startTransition(() => {
                    router.push(`?${params.toString()}`);
                  });
                }}
              />
            )}
          </div>

          <ProfilePopover />
          <Button
            variant={"ghost"}
            className="md:hidden text-black dark:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={24} />
          </Button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden px-4 pb-4 space-y-2 text-sm font-medium bg-white dark:bg-[#2b1b14] border-t border-border">
          {["Home", "Series", "Movies", "New & Popular", "My List"].map(
            (label, index) => (
              <Link
                key={index}
                href="/"
                className="block py-1 px-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            )
          )}
        </nav>
      )}
    </header>
  );
}
