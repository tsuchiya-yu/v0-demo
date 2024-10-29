import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HeartIcon, Menu } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import './globals.css';
import { ReactNode } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { data: catInfo, error } = await supabase
    .from('cat_info')
    .select('*')
    .single();

  if (error) {
    console.error('猫の情報の取得に失敗しました:', error);
    return <div>エラーが発生しました。</div>;
  }

  const menuItems = [
    { href: '/', label: 'ホーム' },
    { href: '/gallery', label: 'ギャラリー' },
    { href: '/blog/list', label: 'ブログ' },
    { href: '/contact', label: 'お問い合わせ' },
  ];

  return (
    <html lang="ja">
      <body className="flex flex-col min-h-screen">
        <header className="px-4 lg:px-6 h-14 flex items-center">
          <Link href="/" className="flex items-center justify-center">
            <HeartIcon className="h-6 w-6" />
            <span className="ml-2 text-2xl font-bold">{catInfo?.name || 'ねこちゃん'}</span>
          </Link>
          <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium hover:underline underline-offset-4">
                {item.label}
              </Link>
            ))}
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="ml-auto md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">メニューを開く</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium hover:underline underline-offset-4"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex-1">
          {children}
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 {catInfo?.name || 'ねこちゃん'} All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link href="/terms" className="text-xs hover:underline underline-offset-4">
              利用規約
            </Link>
            <Link href="/privacy" className="text-xs hover:underline underline-offset-4">
              プライバシーポリシー
            </Link>
          </nav>
        </footer>
      </body>
    </html>
  );
}
