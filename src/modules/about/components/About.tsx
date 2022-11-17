import classNames from "classnames";
import MeImg from "../../../../public/assets/common/img/me.jpg";
import BlurMeImg from "../../../../public/assets/common/img/blur-me.jpg";
import Image from "next/image";

import TwitterIcon from "../../../../public/assets/modules/about/svg/twitter.svg";
import LinkedinIcon from "../../../../public/assets/modules/about/svg/linkedin.svg";
import GithubIcon from "../../../../public/assets/modules/about/svg/github.svg";
import Link from "next/link";

/**
 * About main component for page
 */
const About = () => {
    return (
        <>
            {/*
                Page Heading
             */}
            <h1 className={classNames(
                "text-center font-serif text-gray-700 text-8xl",
                "dark:text-gray-100"
            )}>
                Hello.
            </h1>
            {/*
                Summary paragraph for About page
             */}
            <section className={"mt-24 mx-auto"}>
                <div className={"grid grid-cols-12"}>
                    <div className={"col-span-12 sm:col-span-4"}>
                        <div className={"w-3/4 sm:w-full mx-auto"}>
                            <Image
                                alt={"About Image"}
                                src={MeImg}
                                placeholder={'blur'}
                                blurDataURL={BlurMeImg.src}
                            />
                        </div>
                    </div>
                    <div className={classNames(
                        'mt-10 sm:mt-0 col-span-12 sm:col-span-8 px-8',
                        'text-3xl font-light text-gray-800',
                        'dark:text-gray-100'
                    )}>
                        <div className={"mb-8"}>
                            I&apos;m James, a self-taught software and web developer based in Manchester, England.
                        </div>
                        <div className={"mb-8"}>
                            I&apos;ve been developing software for the past 10 years, working on personal projects,
                            professional engineering projects and open-sourced projects.
                        </div>
                        <div className={"mb-8"}>
                            My focus is create useful, accessible and performant software for the web.
                        </div>
                    </div>
                </div>
            </section>
            {/*
                Additional information
             */}
            <section
                className={classNames(
                    'mx-auto mt-16 pb-4',
                    'px-4'
                )}
                style={{maxWidth: '41rem'}}
            >
                {/*
                    Work Information
                 */}
                <div className={"text-gray-800"}>
                    <h3 className={"text-4xl font-serif dark:text-gray-100"}>
                        Work
                    </h3>
                    <div className={classNames(
                        'mt-2',
                        'text-2xl leading-10 tracking-wide font-normal text-gray-700',
                        'dark:text-gray-200'
                    )}>
                        I work at <a href={"https://www.unitedutilities.com/"}>United Utilities</a>, a water and
                        wastewater utility company in the North West of England. I work on multi-million pound projects
                        with multidisciplinary engineering teams.
                    </div>
                </div>
                {/*
                    Hobbies
                */}
                <div className={"mt-20 text-gray-800"}>
                    <h3 className={"text-4xl font-serif dark:text-gray-100"}>
                        Offline
                    </h3>
                    <div className={classNames(
                        "mt-2 text-2xl leading-10 tracking-wide font-normal text-gray-700",
                        "dark:text-gray-200"
                    )}> I enjoy attending meetups when I have time and something interesting to discuss.
                        I frequently attend <a href={"https://www.meetup.com/mancjs/"}>MancJS</a> and <a
                            href={"https://www.meetup.com/manchester-web-meetup/"}>Manchester Web Meetup</a>.
                        I am an avid hiker who appreciates discovering new places and reaching new heights.
                    </div>
                </div>
                {/*
                    Socials
                */}
                <div className={"mt-20 mb-8 text-gray-800"}>
                    <h3 className={"text-4xl font-serif dark:text-gray-100"}>
                        Online
                    </h3>
                    <div className={classNames(
                        "mt-2 text-2xl tracking-wide font-normal text-gray-700",
                        "dark:text-gray-300"
                    )}>
                        <div className={"ml-4"}>
                            <div className={"flex gap-4 align-middle mb-3"}>
                                <div className={"w-4 h-4"}>
                                    <Image className={"dark:invert"} alt={"Linked in"} src={LinkedinIcon}></Image>
                                </div>
                                <div>
                                    <Link href={"https://www.linkedin.com/in/james-lomax/"}>
                                        LinkedIn
                                    </Link>
                                </div>
                            </div>
                            <li className={"flex gap-4 align-middle mb-3"}>
                                <div className={"w-4 h-4"}>
                                    <Image className={"dark:invert"} alt={"Github"} src={GithubIcon}></Image>
                                </div>
                                <div>
                                    <Link href={"https://github.com/James-buzz"}>
                                        Github
                                    </Link>
                                </div>
                            </li>
                            {/*<li className={"flex gap-4 align-middle mb-3"}>*/}
                            {/*    <div className={"w-4 h-4"}>*/}
                            {/*        <Image className={"dark:invert"} alt={"Twitter"} src={TwitterIcon}></Image>*/}
                            {/*    </div>*/}
                            {/*    <div>*/}
                            {/*        <Link href={""}>*/}
                            {/*            Twitter*/}
                            {/*        </Link>*/}
                            {/*    </div>*/}
                            {/*</li>*/}
                        </div>
                    </div>
                </div>
                {/*
                    Domains
                */}
                <div className={"mt-20 mb-8 text-gray-800"}>
                    <h3 className={"text-4xl font-serif dark:text-gray-100"}>
                        Domains
                    </h3>
                    <div className={classNames(
                        "mt-2 text-2xl tracking-wide font-normal text-gray-700",
                        "dark:text-gray-300"
                    )}>
                        <div className={"mb-3"}>
                            camptorch.com
                        </div>
                        <div className={"mb-3"}>
                            minecraft.surf
                        </div>
                        <div className={"mb-3"}>
                            james.buzz
                        </div>
                        <div className={"mb-3"}>
                            typing.email
                        </div>
                        <div className={"mb-3"}>
                            vampr.co.uk
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About;