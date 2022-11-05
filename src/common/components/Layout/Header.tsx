import Image from "next/image";
import Container from "../Container/Container";
import LogoIcon from "../../../../public/assets/common/svg/logo.svg";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";


const Header = () => {
    const router = useRouter();

    /* Day/Night time switcher component */
    const ThemeSwitcher = dynamic(() => import('./ThemeSwitch/ThemeSwitcher'), {
        ssr: false
    });

    /*  Header Component */
    return (
        <header className={"py-6"}>
            <Container>
                <div className={classNames(
                    "mx-auto max-w-6xl",
                    "flex flex-wrap items-center justify-between"
                )}>
                    {/* Header Bee Logo */}
                    <div className={"flex items-center hidden md:block"}>
                        <div className={"font-bold"}>
                            <Link href={"/"}>
                                <div className={"w-8 cursor-pointer"}>
                                    <Image className={classNames(
                                        "dark:invert",
                                    )} alt={"Icon logo"} src={LogoIcon}/>
                                </div>
                            </Link>
                        </div>
                    </div>
                    {/* Header navbar */}
                    <div>
                        <nav>
                            <ul className={"flex flex-wrap items-center gap-4 font-sans"}>
                                {HeaderMenuItems.map((item, key) => (
                                    <Link key={key} href={item.link}>
                                        <li className={"cursor-pointer px-3"}>
                                            <div className={classNames(
                                                "py-2 flex gap-2 items-center",
                                                "font-sans tracking-wide lowercase",
                                                "border-b-4",
                                                "transition-all duration-150",
                                                router.pathname == item.link ? "border-pink-500 dark:border-cyan-500 border-dotted" : "border-dotted border-transparent dark:hover:border-cyan-800 hover:border-pink-100"
                                            )}>
                                                {/* Credit: Keyamoon Pixel Icons from Dribble.com */}
                                                <div className={"text-xs font-bold dark:invert"}>
                                                    {item.icon}
                                                </div>
                                                <div>{item.prefix}</div>
                                            </div>
                                        </li>
                                    </Link>
                                ))}
                                {/* Theme chooser */}
                                <li className={""}>
                                    <ThemeSwitcher/>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </Container>
        </header>
    )
}

/* Import NextJS icon for Header into Image component */
const HeaderIcon = (icon: any) => {
    return (
        <div className={"w-3 h-3"}>
            <Image alt={"Header icon"} src={icon}/>
        </div>
    )
}

/* Header Menu Icons */
import HomeIcon from '../../../../public/assets/common/icon/home.svg';
import PostsIcon from '../../../../public/assets/common/icon/palette.svg';
import ProjectsIcon from '../../../../public/assets/common/icon/bullhorn.svg';
import WalksIcon from '../../../../public/assets/common/icon/map.svg';
import AboutIcon from '../../../../public/assets/common/icon/question.svg';
import {useTheme} from "next-themes";
import classNames from "classnames";
import Link from "next/link";
import {MoonIcon, SunIcon} from "@heroicons/react/24/solid";

/* Header Menu Items */
const HeaderMenuItems = [
    {
        prefix: "Home",
        link: "/",
        icon: HeaderIcon(HomeIcon)
    },
    {
        prefix: "Walks",
        link: "/walks",
        icon: HeaderIcon(WalksIcon)
    },
    {
        prefix: "Posts",
        link: "/posts",
        icon: HeaderIcon(PostsIcon)
    },
    // {
    //     prefix: "Walks",
    //     link: "/walks",
    //     icon: HeaderIcon(WalksIcon)
    // },
    {
        prefix: "About",
        link: "/about",
        icon: HeaderIcon(AboutIcon)
    },
];

export default Header;