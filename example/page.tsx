"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaInstagram,
  FaGithub,
  FaTiktok,
  FaBehance,
  FaArrowUp,
  FaHeart,
  FaImages,
  FaGlobe,
  FaBook,
  FaLeaf,
  FaChartLine,
  FaShieldAlt,
  FaBoxOpen,
  FaCode,
  FaChartBar,
} from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import { SiKofi, SiBluesky } from "react-icons/si";

// --- COMPONENT: SKELETON (UPDATE: Pake Hitam Opacity biar kelihatan) ---
const SkeletonCard = ({ className }: { className?: string }) => (
  <div
    className={`bg-black/20 animate-pulse rounded-[2.5rem] ${className}`}
  ></div>
);

export default function Home() {
  // --- STATE ---
  const [loading, setLoading] = useState(true);
  const [igFollowers, setIgFollowers] = useState(1200);

  // --- 1. SIMULASI LOADING ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // --- 2. ANIMASI INSTAGRAM ---
  useEffect(() => {
    if (loading) return;
    const target = 1351;
    const duration = 2000;
    const steps = 50;
    const increment = (target - igFollowers) / steps;
    let current = igFollowers;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setIgFollowers(target);
        clearInterval(timer);
      } else {
        setIgFollowers(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [loading]);

  const getFavicon = (url: string) => {
    return `https://www.google.com/s2/favicons?sz=128&domain=${url}`;
  };

  // --- GITHUB PATTERN ---
  const githubCols = [
    [0, 1, 2, 1, 0, 0, 1],
    [1, 2, 3, 2, 1, 0, 0],
    [2, 3, 1, 0, 2, 1, 0],
    [1, 0, 2, 3, 1, 2, 1],
    [3, 1, 0, 1, 2, 0, 0],
    [1, 2, 0, 2, 1, 3, 2],
    [0, 1, 3, 1, 0, 1, 0],
    [2, 0, 1, 3, 2, 0, 1],
    [1, 3, 2, 0, 1, 2, 3],
    [0, 2, 1, 2, 3, 1, 0],
    [3, 1, 0, 1, 0, 2, 1],
    [1, 2, 3, 2, 1, 0, 2],
    [2, 0, 1, 3, 0, 1, 0],
  ];

  const getGithubColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#40c463]";
      case 2:
        return "bg-[#30a14e]";
      case 3:
        return "bg-[#216e39]";
      default:
        return "bg-[#ebedf0]";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 bg-[linear-gradient(to_right,#d4d4d8_1px,transparent_1px),linear-gradient(to_bottom,#d4d4d8_1px,transparent_1px)] bg-[size:24px_24px] font-sans text-gray-900 pb-12">
      {/* === BANNER SECTION === */}
      <div className="relative w-full h-[250px] md:h-[450px] bg-black overflow-hidden group [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]">
        {loading ? (
          // Update skeleton banner juga biar selaras
          <div className="w-full h-full bg-gray-800 animate-pulse"></div>
        ) : (
          <>
            <Image
              src="/Solana-Logo.webp"
              alt="Banner"
              fill
              quality={100}
              priority
              sizes="100vw"
              className="object-contain object-center opacity-95 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5 pointer-events-none"></div>
          </>
        )}
      </div>

      {/* === CONTENT CONTAINER === */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 -mt-16 md:-mt-24">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* === SIDEBAR PROFIL (RGB GAMING TETAP ADA) === */}
          <div className="w-full md:w-[480px] flex-shrink-0">
            {loading ? (
              <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-white/60 sticky top-8 h-[600px] flex flex-col gap-8">
                <SkeletonCard className="w-40 h-40 rounded-full mx-auto md:mx-0" />
                <div className="space-y-4">
                  <SkeletonCard className="h-12 w-3/4" />
                  <SkeletonCard className="h-8 w-1/2" />
                </div>
                <div className="space-y-3">
                  <SkeletonCard className="h-5 w-full" />
                  <SkeletonCard className="h-5 w-full" />
                  <SkeletonCard className="h-5 w-2/3" />
                </div>
                <SkeletonCard className="h-16 w-full mt-auto rounded-2xl" />
              </div>
            ) : (
              <div className="sticky top-8">
                {/* CONTAINER RGB BORDER */}
                <div className="relative w-full rounded-[3rem] overflow-hidden p-[4px] shadow-2xl group">
                  <div className="absolute inset-[-500%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#EC4899_0%,#8B5CF6_25%,#3B82F6_50%,#14B8A6_75%,#EC4899_100%)] opacity-100"></div>

                  {/* KARTU PROFIL */}
                  <div className="relative bg-white rounded-[2.8rem] p-10 h-full flex flex-col gap-8">
                    <div className="relative mb-2">
                      <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-[8px] border-white shadow-xl overflow-hidden bg-gray-200 mx-auto md:mx-0 relative">
                        <Image
                          src="/avatar.webp"
                          alt="Profile"
                          fill
                          quality={100}
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover"
                          priority
                        />
                      </div>
                    </div>
                    <div>
                      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-3">
                        0x5zen
                      </h1>
                      <p className="text-gray-500 text-xl font-medium">
                        3D Artist | NFT Creator
                      </p>
                    </div>
                    <div className="space-y-6">
                      <p className="text-gray-600 leading-relaxed font-medium text-lg">
                        3D Artist & Computer Science Student pushing the
                        boundaries of digital art. From complex algorithms to
                        character rendering, I turn technical concepts into
                        visual realities and Solana NFTs.
                      </p>
                      <div className="flex flex-wrap gap-3 pt-2">
                        <div className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-default group/tag">
                          <span className="text-xl group-hover/tag:scale-110 transition-transform">
                            💎
                          </span>
                          <span className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                            3D Artist
                          </span>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-default group/tag">
                          <span className="text-xl group-hover/tag:scale-110 transition-transform">
                            💻
                          </span>
                          <span className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                            Coding
                          </span>
                        </div>
                      </div>
                    </div>
                    <a
                      href="mailto:zen@0x5zen.dev"
                      className="mt-2 block w-full bg-gray-900 text-white text-center py-4 rounded-3xl font-bold text-lg hover:bg-black transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl active:scale-95 shadow-lg shadow-gray-900/20 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                    >
                      Contact Me
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* === GRID UTAMA === */}
          <div className="flex-1 flex flex-col gap-8 md:mt-8">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px] grid-flow-dense">
              {loading ? (
                <>
                  <SkeletonCard className="h-[200px]" />
                  <SkeletonCard className="col-span-2 h-[200px]" />
                  <SkeletonCard className="h-[200px]" />
                  <SkeletonCard className="h-[200px]" />
                  <SkeletonCard className="h-[200px]" />
                  <SkeletonCard className="col-span-2 h-[200px]" />
                  <SkeletonCard className="h-[200px]" />
                  <SkeletonCard className="h-[200px]" />
                  <SkeletonCard className="h-[200px]" />
                </>
              ) : (
                <>
                  {/* INSTAGRAM */}
                  <a
                    href="https://instagram.com/me.ryzen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between border border-gray-100 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                      <FaInstagram className="text-2xl" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold text-lg mb-1">
                        @me.ryzen
                      </p>
                      <div
                        role="button"
                        className="bg-[#4094EF] text-white px-5 py-1.5 rounded-lg font-bold text-sm w-fit group-hover:bg-[#2879d0] transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                      >
                        Follow {(igFollowers / 1000).toFixed(1)}k
                      </div>
                    </div>
                  </a>

                  {/* YOUTUBE */}
                  <a
                    href="https://youtube.com/@zenzxty"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-span-2 bg-[#FF0000] text-white p-0 rounded-[2.5rem] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group flex"
                  >
                    <div className="absolute inset-0 bg-[url('https://img.youtube.com/vi/Fyh9yRG3ns8?si=bEEE4Ux73fMwksYp.webp')] bg-cover bg-center opacity-50 group-hover:scale-105 transition-transform duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-[#FF0000]/80 to-transparent"></div>
                    <div className="z-10 p-8 flex flex-col justify-between w-full h-full">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white text-red-600 rounded-full flex items-center justify-center shadow-lg">
                            <FaYoutube className="text-2xl pl-0.5" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black tracking-tight">
                              Zenzxty
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                              <p className="text-white/90 text-sm font-medium">
                                New Video!
                              </p>
                            </div>
                          </div>
                        </div>
                        <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold border border-white/30">
                          121 Subs
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-white/80 text-sm font-medium line-clamp-1 max-w-[200px]">
                          teknik kendaraan ringan #rvthereyet
                        </p>
                        <div
                          role="button"
                          className="bg-white text-red-600 px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                        >
                          Subscribe
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* TIKTOK */}
                  <a
                    href="https://tiktok.com/@zenzxty"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between border border-gray-100 group"
                  >
                    <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center">
                      <FaTiktok className="text-2xl" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold text-lg mb-1">
                        @zenzxty
                      </p>
                      <div
                        role="button"
                        className="bg-[#FE2C55] text-white px-5 py-1.5 rounded-lg font-bold text-sm w-fit group-hover:bg-[#d61e42] transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                      >
                        Follow 115
                      </div>
                    </div>
                  </a>

                  {/* BEHANCE */}
                  <a
                    href="https://behance.net/0x5zen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0057ff] text-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group border border-blue-600"
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <FaBehance className="text-2xl" />
                    </div>
                    <div>
                      <p className="text-blue-100 font-bold text-xs uppercase mb-1">
                        Portfolio
                      </p>
                      <p className="text-xl font-bold">Behance</p>
                      <div
                        role="button"
                        className="mt-3 bg-white text-[#0057ff] px-4 py-1 rounded-full text-xs font-bold w-fit transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95"
                      >
                        View Work
                      </div>
                    </div>
                  </a>

                  {/* BLUESKY */}
                  <a
                    href="https://bsky.app/profile/0x5zen.bsky.social"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between border border-gray-100 group"
                  >
                    <div className="w-12 h-12 bg-[#0085ff] text-white rounded-xl flex items-center justify-center">
                      <SiBluesky className="text-2xl" />
                    </div>
                    <div>
                      <p className="text-gray-400 font-bold text-xs uppercase mb-1">
                        Social
                      </p>
                      <p className="text-xl font-bold text-gray-900">Bluesky</p>
                      <p className="text-xs text-gray-500">bsky.app</p>
                    </div>
                  </a>

                  {/* CARA */}
                  <a
                    href="https://cara.app/0x5zen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between border border-gray-100 group"
                  >
                    <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-bold text-xl font-serif">
                      C
                    </div>
                    <div>
                      <p className="text-gray-400 font-bold text-xs uppercase mb-1">
                        Portfolio
                      </p>
                      <p className="text-xl font-bold text-gray-900">Cara</p>
                      <p className="text-xs text-gray-500">cara.app</p>
                    </div>
                  </a>

                  {/* GITHUB */}
                  <a
                    href="https://github.com/meryzennn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-start justify-between border border-gray-100 group"
                  >
                    <div className="flex flex-col justify-between h-full min-w-[140px]">
                      <div className="flex flex-col gap-3">
                        <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center">
                          <FaGithub className="text-3xl" />
                        </div>
                        <p className="text-gray-900 font-bold text-lg mt-1">
                          meryzennn
                        </p>
                      </div>
                      <div className="mt-4 px-6 py-2 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95 w-fit cursor-pointer shadow-sm">
                        Follow
                      </div>
                    </div>
                    <div className="flex gap-1 overflow-hidden h-full items-end pb-1">
                      {githubCols.map((col, i) => (
                        <div key={i} className="flex flex-col gap-1">
                          {col.map((level, j) => (
                            <div
                              key={j}
                              className={`w-3 h-3 rounded-[2.5px] ${getGithubColor(
                                level,
                              )} transition-all duration-500`}
                            ></div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </a>

                  {/* TWITTER */}
                  <a
                    href="https://x.com/0x5zen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#E6F6FF] text-[#1DA1F2] p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group border border-blue-100"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <FaXTwitter className="text-2xl text-black" />
                    </div>
                    <div>
                      <p className="text-blue-400 font-bold text-xs uppercase mb-1">
                        Thoughts
                      </p>
                      <p className="text-xl font-bold text-gray-900">@0x5zen</p>
                    </div>
                  </a>

                  {/* KO-FI */}
                  <a
                    href="https://ko-fi.com/0x5zen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#E6F3FF] text-[#13C3FF] p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-100 flex flex-col justify-between group"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <SiKofi className="text-2xl" />
                    </div>
                    <div>
                      <p className="text-blue-400 font-bold text-xs uppercase mb-1">
                        Support Me
                      </p>
                      <p className="text-xl font-bold text-gray-900">
                        Buy Coffee ☕
                      </p>
                    </div>
                  </a>

                  {/* SOCIABUZZ */}
                  <a
                    href="https://sociabuzz.com/notryzen/tribe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FFF4E6] text-[#FF8C00] p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-orange-100 flex flex-col justify-between group"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform overflow-hidden">
                      <img
                        src={getFavicon("sociabuzz.com")}
                        alt="SociaBuzz"
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-orange-400 font-bold text-xs uppercase mb-1">
                        Tribe
                      </p>
                      <p className="text-xl font-bold text-gray-900">
                        SociaBuzz 🎁
                      </p>
                    </div>
                  </a>
                </>
              )}
            </div>

            {/* --- WEB3 SECTION --- */}
            <div>
              <h2 className="text-2xl font-black tracking-tight text-gray-800 mb-6 flex items-center gap-2">
                WEB3{" "}
                <span className="bg-gray-200/60 backdrop-blur-sm border border-gray-200/50 text-gray-600 px-3 py-1 rounded-lg font-bold text-xs uppercase tracking-widest">
                  Collection
                </span>
              </h2>

              <div className="flex flex-col gap-4">
                {/* 1. BARIS ATAS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {loading ? (
                    <>
                      {" "}
                      {[...Array(4)].map((_, i) => (
                        <SkeletonCard key={i} className="h-[180px]" />
                      ))}{" "}
                    </>
                  ) : (
                    <>
                      <a
                        href="https://exchange.art/meryzennn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-5 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 aspect-square flex flex-col justify-between border border-gray-100 group"
                      >
                        <img
                          src={getFavicon("exchange.art")}
                          alt="Exchange Art"
                          className="w-12 h-12 rounded-xl group-hover:scale-110 transition-transform"
                        />
                        <div>
                          <p className="font-bold text-gray-900 text-lg">
                            Exchange Art
                          </p>
                          <p className="text-xs text-gray-500 font-medium">
                            Solana
                          </p>
                        </div>
                      </a>
                      <a
                        href="https://rodeo.club/@0x5zen"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-5 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 aspect-square flex flex-col justify-between border border-gray-100 group"
                      >
                        <img
                          src={getFavicon("rodeo.club")}
                          alt="Rodeo"
                          className="w-12 h-12 rounded-xl group-hover:scale-110 transition-transform"
                        />
                        <div>
                          <p className="font-bold text-gray-900 text-lg">
                            Rodeo
                          </p>
                          <p className="text-xs text-gray-500 font-medium">
                            Club
                          </p>
                        </div>
                      </a>
                      <a
                        href="https://warpcast.com/0x5zen"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-5 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 aspect-square flex flex-col justify-between border border-gray-100 group"
                      >
                        <img
                          src={getFavicon("warpcast.com")}
                          alt="Warpcast"
                          className="w-12 h-12 rounded-xl group-hover:scale-110 transition-transform"
                        />
                        <div>
                          <p className="font-bold text-gray-900 text-lg">
                            Farcaster
                          </p>
                          <p className="text-xs text-gray-500 font-medium">
                            Social
                          </p>
                        </div>
                      </a>
                      <a
                        href="https://paras.id/0x5zen"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-5 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 aspect-square flex flex-col justify-between border border-gray-100 group"
                      >
                        <div className="relative w-12 h-12 group-hover:scale-110 transition-transform">
                          <Image
                            src="/paras.webp"
                            alt="Paras"
                            fill
                            className="rounded-xl object-cover"
                            sizes="50px"
                            quality={100}
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-lg">
                            Paras
                          </p>
                          <p className="text-xs text-gray-500 font-medium">
                            Near NFT
                          </p>
                        </div>
                      </a>
                    </>
                  )}
                </div>

                {/* 2. ZIG-ZAG LAYOUT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-4">
                    {/* ART 1 (KIRI ATAS) */}
                    {loading ? (
                      <SkeletonCard className="h-[400px]" />
                    ) : (
                      <div className="rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer h-[400px] relative">
                        <Image
                          src="/art3.webp"
                          alt="Pink Porsche"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          quality={100}
                        />
                      </div>
                    )}

                    {/* MALLOW */}
                    {loading ? (
                      <SkeletonCard className="h-[180px]" />
                    ) : (
                      <a
                        href="https://mallow.art/0x5zen"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-between border border-gray-100 group h-[180px]"
                      >
                        <div className="flex flex-col justify-between h-full gap-2">
                          <img
                            src={getFavicon("mallow.art")}
                            alt="Mallow"
                            className="w-12 h-12 rounded-xl"
                          />
                          <div>
                            <p className="font-bold text-gray-900 text-lg">
                              Mallow
                            </p>
                            <p className="text-xs text-gray-500 font-medium">
                              mallow.art
                            </p>
                          </div>
                        </div>
                        <div className="w-32 h-24 rounded-2xl overflow-hidden shadow-sm bg-black flex items-center justify-center group-hover:scale-105 transition duration-300">
                          <span className="text-pink-500 font-bold text-lg font-mono">
                            mallow.
                          </span>
                        </div>
                      </a>
                    )}
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* DRiP */}
                    {loading ? (
                      <SkeletonCard className="h-[180px]" />
                    ) : (
                      <a
                        href="https://drip.haus/0x5zen"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-between border border-gray-100 group h-[180px]"
                      >
                        <div className="flex flex-col justify-between h-full gap-2">
                          <img
                            src={getFavicon("drip.haus")}
                            alt="DRiP"
                            className="w-12 h-12 rounded-xl"
                          />
                          <div>
                            <p className="font-bold text-gray-900 text-lg">
                              DRiP
                            </p>
                            <p className="text-xs text-gray-500 font-medium">
                              d.rip
                            </p>
                          </div>
                        </div>
                        <div className="w-32 h-24 rounded-2xl overflow-hidden shadow-sm relative">
                          <Image
                            src="/chrome.webp"
                            alt="DRiP Preview"
                            fill
                            className="object-cover transform group-hover:scale-110 transition duration-500"
                            sizes="150px"
                            quality={100}
                          />
                        </div>
                      </a>
                    )}

                    {/* ART 2 (KANAN BAWAH) */}
                    {loading ? (
                      <SkeletonCard className="h-[400px]" />
                    ) : (
                      <div className="rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer h-[400px] relative">
                        <Image
                          src="/art2.webp"
                          alt="Chrome Abstract"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          quality={100}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* --- PERSONAL WEBSITE SECTION --- */}
            <div>
              <h2 className="text-2xl font-black tracking-tight text-gray-800 mb-6 flex items-center gap-2">
                Personal Website{" "}
                <span className="bg-gray-200/60 backdrop-blur-sm border border-gray-200/50 text-gray-600 px-3 py-1 rounded-lg font-bold text-xs uppercase tracking-widest">
                  Project/Portfolio
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 3. CARD GALLERY (FULL WIDTH) */}
                {loading ? (
                  <SkeletonCard className="md:col-span-2 h-[350px]" />
                ) : (
                  <a
                    href="https://gallery.0x5zen.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="md:col-span-2 relative group block rounded-[1.5rem] overflow-hidden h-[350px] shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.01] border border-gray-200 ring-offset-2 hover:ring-2 hover:ring-pink-500/20"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src="/gallery.webp"
                        alt="Gallery Preview"
                        fill
                        className="object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition duration-700 object-center"
                        quality={100}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>

                    <div className="absolute top-6 right-6 bg-white/30 backdrop-blur-md p-3 rounded-full text-white shadow-lg group-hover:rotate-45 transition duration-300">
                      <FaArrowUp className="text-lg rotate-45" />
                    </div>

                    <div className="absolute bottom-6 left-6 flex items-center gap-3">
                      <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-center gap-2 group-hover:px-8 transition-all duration-300">
                        <FaImages className="text-pink-600" />
                        <p className="font-bold text-gray-900 text-sm">
                          The Gallery
                        </p>
                      </div>
                    </div>
                  </a>
                )}

                {/* 4. CARD snapfins */}
                {loading ? (
                  <SkeletonCard className="md:col-span-2 h-[350px]" />
                ) : (
                  <a
                    href="https://snapfins.0x5zen.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="md:col-span-2 relative group block rounded-[1.5rem] overflow-hidden h-[350px] shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.01] border border-gray-200 ring-offset-2 hover:ring-2 hover:ring-pink-500/20"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src="/snapfins.webp"
                        alt="snapfins Preview"
                        fill
                        className="object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition duration-700 object-center"
                        quality={100}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>

                    <div className="absolute top-6 right-6 bg-white/30 backdrop-blur-md p-3 rounded-full text-white shadow-lg group-hover:rotate-45 transition duration-300">
                      <FaArrowUp className="text-lg rotate-45" />
                    </div>

                    <div className="absolute bottom-6 left-6 flex items-center gap-3">
                      <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-center gap-2 group-hover:px-8 transition-all duration-300">
                        <FaChartBar className="text-pink-600" />
                        <p className="font-bold text-gray-900 text-sm">
                          Snapfins
                        </p>
                      </div>
                    </div>
                  </a>
                )}

                {/* 1. CARD WEB PORTFOLIO (BALIK NORMAL) */}
                {loading ? (
                  <SkeletonCard className="h-[250px]" />
                ) : (
                  <a
                    href="https://meryzennn.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group block rounded-[1.5rem] overflow-hidden h-[250px] shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.01] border border-gray-200 ring-offset-2 hover:ring-2 hover:ring-blue-500/20"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src="/porto-preview.webp"
                        alt="Portfolio Preview"
                        fill
                        className="object-cover opacity-95 group-hover:opacity-100 transition duration-700 object-top"
                        quality={100}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    <div className="absolute top-6 right-6 bg-white/30 backdrop-blur-md p-3 rounded-full text-white shadow-lg group-hover:rotate-45 transition duration-300">
                      <FaArrowUp className="text-lg rotate-45" />
                    </div>

                    <div className="absolute bottom-6 left-6 flex items-center gap-3">
                      <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-center gap-2 group-hover:px-8 transition-all duration-300">
                        <FaGlobe className="text-blue-500" />
                        <p className="font-bold text-gray-900 text-sm">
                          Web Portfolio
                        </p>
                      </div>
                    </div>
                  </a>
                )}

                {/* 2. CARD PERSONAL DOCS */}
                {loading ? (
                  <SkeletonCard className="h-[250px]" />
                ) : (
                  <a
                    href="https://meryzennn-docs.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group block rounded-[1.5rem] overflow-hidden h-[250px] shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.01] border border-gray-200 ring-offset-2 hover:ring-2 hover:ring-purple-500/20"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src="/docs-preview.webp"
                        alt="Docs Preview"
                        fill
                        className="object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition duration-700 object-top"
                        quality={100}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    <div className="absolute top-6 right-6 bg-white/30 backdrop-blur-md p-3 rounded-full text-white shadow-lg group-hover:rotate-45 transition duration-300">
                      <FaArrowUp className="text-lg rotate-45" />
                    </div>

                    <div className="absolute bottom-6 left-6 flex items-center gap-3">
                      <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-center gap-2 group-hover:px-8 transition-all duration-300">
                        <FaBook className="text-purple-500" />
                        <p className="font-bold text-gray-900 text-sm">
                          Personal Docs
                        </p>
                      </div>
                    </div>
                  </a>
                )}

                {loading ? (
                  <SkeletonCard className="h-[250px]" />
                ) : (
                  <a
                    href="https://purezen.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group block rounded-[1.5rem] overflow-hidden h-[250px] shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.01] border border-gray-200 ring-offset-2 hover:ring-2 hover:ring-emerald-500/20"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src="/purezen.webp"
                        alt="Portfolio Preview"
                        fill
                        className="object-cover opacity-95 group-hover:opacity-100 transition duration-700 object-top"
                        quality={100}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    <div className="absolute top-6 right-6 bg-white/30 backdrop-blur-md p-3 rounded-full text-white shadow-lg group-hover:rotate-45 transition duration-300">
                      <FaArrowUp className="text-lg rotate-45" />
                    </div>

                    <div className="absolute bottom-6 left-6 flex items-center gap-3">
                      <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-center gap-2 group-hover:px-8 transition-all duration-300">
                        <FaLeaf className="text-emerald-500" />
                        <p className="font-bold text-gray-900 text-sm">
                          PureZen
                        </p>
                      </div>
                    </div>
                  </a>
                )}

                {loading ? (
                  <SkeletonCard className="h-[250px]" />
                ) : (
                  <a
                    href="https://zenpnl.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group block rounded-[1.5rem] overflow-hidden h-[250px] shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.01] border border-gray-200 ring-offset-2 hover:ring-2 hover:ring-green-500/20"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src="/zenpnl.webp"
                        alt="Portfolio Preview"
                        fill
                        className="object-cover opacity-95 group-hover:opacity-100 transition duration-700 object-top"
                        quality={100}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    <div className="absolute top-6 right-6 bg-white/30 backdrop-blur-md p-3 rounded-full text-white shadow-lg group-hover:rotate-45 transition duration-300">
                      <FaArrowUp className="text-lg rotate-45" />
                    </div>

                    <div className="absolute bottom-6 left-6 flex items-center gap-3">
                      <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-center gap-2 group-hover:px-8 transition-all duration-300">
                        <FaChartLine className="text-green-500" />
                        <p className="font-bold text-gray-900 text-sm">
                          ZenPnL
                        </p>
                      </div>
                    </div>
                  </a>
                )}

                {/* 6. CARD RUGCHECK */}
                {loading ? (
                  <SkeletonCard className="h-[250px]" />
                ) : (
                  <a
                    href="https://rugcheck.0x5zen.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group block rounded-[1.5rem] overflow-hidden h-[250px] shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.01] border border-gray-200 ring-offset-2 hover:ring-2 hover:ring-red-500/20"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src="/zenrug.png"
                        alt="Rugcheck Preview"
                        fill
                        className="object-cover opacity-95 group-hover:opacity-100 transition duration-700 object-top"
                        quality={100}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    <div className="absolute top-6 right-6 bg-white/30 backdrop-blur-md p-3 rounded-full text-white shadow-lg group-hover:rotate-45 transition duration-300">
                      <FaArrowUp className="text-lg rotate-45" />
                    </div>

                    <div className="absolute bottom-6 left-6 flex items-center gap-3">
                      <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-center gap-2 group-hover:px-8 transition-all duration-300">
                        <FaShieldAlt className="text-red-500" />
                        <p className="font-bold text-gray-900 text-sm">
                          Rugcheck
                        </p>
                      </div>
                    </div>
                  </a>
                )}

                {/* 7. CARD ZENDROP */}
                {loading ? (
                  <SkeletonCard className="h-[250px]" />
                ) : (
                  <a
                    href="https://zendrop.0x5zen.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group block rounded-[1.5rem] overflow-hidden h-[250px] shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.01] border border-gray-200 ring-offset-2 hover:ring-2 hover:ring-orange-500/20"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src="/zendrop.png"
                        alt="ZenDrop Preview"
                        fill
                        className="object-cover opacity-95 group-hover:opacity-100 transition duration-700 object-top"
                        quality={100}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    <div className="absolute top-6 right-6 bg-white/30 backdrop-blur-md p-3 rounded-full text-white shadow-lg group-hover:rotate-45 transition duration-300">
                      <FaArrowUp className="text-lg rotate-45" />
                    </div>

                    <div className="absolute bottom-6 left-6 flex items-center gap-3">
                      <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-center gap-2 group-hover:px-8 transition-all duration-300">
                        <FaBoxOpen className="text-orange-500" />
                        <p className="font-bold text-gray-900 text-sm">
                          ZenDrop
                        </p>
                      </div>
                    </div>
                  </a>
                )}

                {/* 8. CARD ZENDEV */}
                {loading ? (
                  <SkeletonCard className="h-[250px] md:col-span-2" />
                ) : (
                  <a
                    href="https://zendev.0x5zen.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group block rounded-[1.5rem] overflow-hidden h-[250px] shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.01] border border-gray-200 ring-offset-2 hover:ring-2 hover:ring-indigo-500/20 md:col-span-2"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src="/zendev.png"
                        alt="ZenDev Preview"
                        fill
                        className="object-cover opacity-95 group-hover:opacity-100 transition duration-700 object-center"
                        quality={100}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    <div className="absolute top-6 right-6 bg-white/30 backdrop-blur-md p-3 rounded-full text-white shadow-lg group-hover:rotate-45 transition duration-300">
                      <FaArrowUp className="text-lg rotate-45" />
                    </div>

                    <div className="absolute bottom-6 left-6 flex items-center gap-3">
                      <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-center gap-2 group-hover:px-8 transition-all duration-300">
                        <FaCode className="text-indigo-500" />
                        <p className="font-bold text-gray-900 text-sm">
                          ZenDev
                        </p>
                      </div>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === FOOTER SECTION === */}
      <footer className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-16 md:mt-24 mb-8">
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-medium">
            © {new Date().getFullYear()} 0x5zen. All Rights Reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-500 font-medium">
            <span>Made with</span>
            <FaHeart className="text-red-500 mx-1 animate-pulse" />
            <span>using</span>
            <span className="text-black font-bold">Next.js</span>
            <span>&</span>
            <span className="text-[#38bdf8] font-bold">Tailwind</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
