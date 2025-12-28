import Link from "next/link";
import { Sparkles, Twitter, Linkedin, Github } from "lucide-react";

const footerLinks = {
    product: [
        { name: "Templates", href: "/templates" },
        { name: "Pricing", href: "/pricing" },
        { name: "Features", href: "/#features" },
        { name: "Demo", href: "/portal" },
    ],
    company: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
    ],
    legal: [
        { name: "Privacy", href: "#" },
        { name: "Terms", href: "#" },
        { name: "Cookie Policy", href: "#" },
    ],
};

const socialLinks = [
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "GitHub", href: "#", icon: Github },
];

export function MarketingFooter() {
    return (
        <footer className="bg-neutral-950 text-neutral-400">
            <div className="container-wide py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-semibold text-lg text-white">
                                SmallBiz<span className="text-brand-400">Growth</span>
                            </span>
                        </Link>
                        <p className="mt-4 max-w-xs text-sm leading-relaxed">
                            The all-in-one platform for small businesses to launch professional websites,
                            capture leads, and grow with AI-powered tools.
                        </p>
                        <div className="mt-6 flex gap-4">
                            {socialLinks.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
                                    aria-label={item.name}
                                >
                                    <item.icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white">Product</h3>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.product.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm transition-colors hover:text-white"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white">Company</h3>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.company.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm transition-colors hover:text-white"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white">Legal</h3>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.legal.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm transition-colors hover:text-white"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-neutral-800 pt-8">
                    <p className="text-center text-sm">
                        &copy; {new Date().getFullYear()} SmallBiz Growth Platform. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
