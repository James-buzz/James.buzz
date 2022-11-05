import {useState} from "react";
import classNames from "classnames";
import {CalendarDaysIcon, HeartIcon} from "@heroicons/react/24/solid";
import Moment from "react-moment";
import Link from "next/link";
import Image from "next/image";

interface Props {
    title: string;
    date?: string;
    backgroundURL: string;
    abstract: string;
    invert?: boolean;
    link?: string;
    small?: boolean;
}

const FeaturedCard = (props: Props) => {
    /* Functionality of hovering for Card */
    const [hovering, setHovered] = useState(false);
    const onMouseEnter = () => setHovered(true);
    const onMouseLeave = () => setHovered(false);
    /* Return view */
    return (
        <Link href={props.link ? props.link : ''}>
            <div className={classNames(
                'cursor-pointer',
                props.small ? 'h-40' : 'h-80',
                'relative p-3',
                'flex flex-col justify-between',
                'rounded-md shadow-xl'
            )}
                 onMouseEnter={onMouseEnter}
                 onMouseLeave={onMouseLeave}>
                {/*
                    Card Background Image
                */}
                <Image
                    className={"z-0 rounded-md"}
                    src={props.backgroundURL}
                    alt={"Featured Card Background"}
                    layout={'fill'}
                    objectFit={'cover'}
                    objectPosition={'center'}
                    loading={'lazy'}
                />
                {/*
                    Card Hover background
                */}
                <div className={classNames(
                    "transition-all",
                    "z-10 absolute top-0 left-0",
                    "bg-black h-full w-full",
                    hovering ? "opacity-30" : "opacity-10"
                )}></div>
                {/*
                    Card Content
                 */}
                <div className={"z-20"}>
                    <div className={classNames(
                        "text-2xl font-bold font-serif font-normal tracking-wide",
                        hovering ? 'text-white' : props.invert ? 'text-black' : 'text-white'
                    )}>
                        {props.title}
                    </div>
                    {hovering ? (
                        <div className={"text-white mt-2"}>
                            {props.abstract}
                        </div>
                    ) : (<></>)}
                </div>
                {/*
                    Card likes
                 */}
                <div className={"z-10 flex items-center text-white"}>
                    {props.date ? (<>
                        <CalendarDaysIcon className={"w-5 h-5"}/>
                        <div className={"ml-1 text-base font-medium"}>
                            <Moment parse={"DD/MM/YYYY"} format={'MMM YYYY'}>{props.date}</Moment>
                        </div>
                    </>): (<></>)}
                </div>
            </div>
        </Link>

    )
}

export default FeaturedCard;