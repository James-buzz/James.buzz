import classNames from "classnames";
import {GlobeAltIcon} from "@heroicons/react/24/solid";
import Link from "next/link";
import Container from "../Container/Container";

const Footer = () => {
    return <footer className={classNames(
        'mt-12 pt-8 pb-12',
        'w-full',
        'bg-white border-t border-gray-200',
        'text-sm',
        'dark:bg-gray-800 dark:border-gray-600'
    )}>
        <Container className={"flex items-center justify-around"}>
            <div className={"flex items-center"}>
                <div className={"mr-10"}>
                    <div className={"flex"}>
                        © <div className={"ml-1 font-bold"}>2022</div>
                    </div>
                    <Link href={"/"}>
                        <div className={"cursor-pointer underline"}>
                            James Lomax
                        </div>
                    </Link>
                </div>
                <div className={"mr-10"}>
                    <div>
                        <div className={"font-bold"}>Social</div>
                    </div>
                    <Link href={'https://github.com/James-buzz'}>
                        <div className={"cursor-pointer underline"}>
                            Github
                        </div>
                    </Link>
                </div>
            </div>
            <div>
                <GlobeAltIcon className={"w-4 h-4"}/>
            </div>
        </Container>
    </footer>;
}

export default Footer;