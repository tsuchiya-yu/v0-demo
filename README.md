
## 環境構築
1. [supabase](https://supabase.com/)でアカウントを作成する。
2. supabaseチームやプロジェクトを作成して、SQL EDITORで以下のクエリを実行する。
```sql
-- `cat_info` テーブルの削除と作成
DROP TABLE IF EXISTS cat_info;
CREATE TABLE cat_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    short_description TEXT,
    long_description TEXT,
    image_url TEXT,
    instagram_url TEXT,
    twitter_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- `blog_posts` テーブルの削除と作成
DROP TABLE IF EXISTS blog_posts;
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT,
    excerpt TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- `gallery` テーブルの削除と作成
DROP TABLE IF EXISTS gallery;
CREATE TABLE gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    url TEXT NOT NULL,
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);
```
3.上記のテーブルにデータを入れる。
4. このリポジトリをgit cloneをして`npm run dev`をする。
5. `http://localhost:3000/`にアクセスすると画面が表示されます🎉