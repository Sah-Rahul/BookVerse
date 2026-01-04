import Layout from "@/components/user/Layout";

export default function UserRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
