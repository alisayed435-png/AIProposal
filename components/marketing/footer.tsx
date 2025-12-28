import Link from "next/link";
import { Zap, Twitter, Linkedin, Github } from "lucide-react";

const footerLinks = {
    product: [
        { name: "Templates", href: "/templates" },
        { name: "Pricing", href: "/pricing" },
        { name: "Features", href: "/#features" },
    ],
    company: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
    ],
    legal: [
        { name: "Privacy", href: "#" },
        { name: "Terms", href: "#" },
    ],
};

const socialLinks = [
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "GitHub", href: "#", icon: Github },
];

export function MarketingFooter() {
    return (
        <footer className="bg-neutral-50 border-t border-neutral-200/50">
            <div className="container-wide py-16">
                <div className="grid gap-12 lg:grid-cols-5">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="relative flex h-10 w-10 items-center justify-center">
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500" />
                                <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-br from-white/20 to-transparent" />
                                <Zap className="relative h-5 w-5 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[17px] font-semibold tracking-tight text-neutral-900 leading-tight">
                                    GrowthOS
                                </span>
                                <span className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                                    For Business
                                </span>
                            </div>
                        </Link>
                        <p className="mt-4 text-sm text-neutral-600 max-w-xs leading-relaxed">
                            The all-in-one platform for small businesses to grow their online presence,
                            capture leads, and scale effortlessly.
                        </p>
                        {/* Social links */}
                        <div className="mt-6 flex gap-4">
                            {socialLinks.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-200/60 text-neutral-600 transition-all hover:bg-neutral-300/60 hover:text-neutral-900"
                                    aria-label={item.name}
                                >
                                    <item.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                            Product
                        </h3>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                            Company
                        </h3>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                            Legal
                        </h3>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-neutral-200/50">
                    <p className="text-sm text-neutral-500 text-center">
                        © {new Date().getFullYear()} GrowthOS. All rights reserved. Built with ❤️ for small businesses.
                    </p>
                </div>
            </div>
        </footer>
    );
}
