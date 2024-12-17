// app/layout.tsx
export const metadata = {
  title: "My Blog",
  description: "This is a blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
