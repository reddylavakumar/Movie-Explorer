"use client";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { CircleX, Menu, Play, SearchIcon } from "lucide-react";
import Link from "next/link";
import { ProfilePopover } from "../popover/PopOver";
import { ThemeToggle } from "../theme/theme";
import { Button } from "../ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import useDebouncedValue from "@/lib/Debounce";
// import useDebouncedValue from "@/lib/Debounce.ts";

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeButton, setActiveButton] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const debouncedQuery = useDebouncedValue(inputValue, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedQuery) {
      params.set("query", debouncedQuery);
    } else {
      params.delete("query");
    }
    router.push(`?${params.toString()}`);
  }, [debouncedQuery, router, searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleClick = (item: any) => {
    if (activeButton === item.query) {
      return;
    }
    setActiveButton(item.query);
    if (item?.query == "home") {
      router.push("/");
    } else if (item?.query == "trending") {
      router.push(`?type=trending`);
    } else if (item?.query == "series") {
      router.push(`?type=series`);
    } else if (item?.query == "newpopular") {
      router.push(`?type=new-popular`);
    }
  };

  const buttonsForNav = [
    { name: "Home", query: "home" },
    { name: "Series", query: "series" },
    { name: "Trending", query: "trending" },
    { name: "New & Popular", query: "newpopular" },
  ];

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
            {buttonsForNav.map((item, index) => (
              <Button
                variant={activeButton === item?.query ? "outline" : "link"}
                key={index}
                onClick={() => handleClick(item)}
              >
                {item?.name}
              </Button>
            ))}
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

                  // startTransition(() => {
                  router.push(`?${params.toString()}`);
                  // });
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
          {buttonsForNav.map((item, index) => (
            <Button
              variant={"link"}
              key={index}
              onClick={() => handleClick(item)}
              className="block py-1 px-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {item?.name}
            </Button>
          ))}
        </nav>
      )}
    </header>
  );
}
