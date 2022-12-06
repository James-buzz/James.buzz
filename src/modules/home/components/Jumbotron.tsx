import Container from "../../../common/components/Container/Container";
import classNames from "classnames";

/**
 * Homepage Jumbotron component.
 * Summarise the about page.
 * @constructor
 */
const Jumbotron = () => {
    return (
        <Container className={"pt-6 sm:pt-20 sm:px-6 px-8"}>
            {/* Title for jumbotron */}
            <h3 className={classNames(
                'uppercase font-bold font-sans',
                'text-pink-500 tracking-wider text-lg',
                'dark:text-cyan-400'
            )}>
                Hello, my name is James
            </h3>
            {/* Welcome to title */}
            <h1 id={"christmas"} className={classNames(
                "mt-1",
                "font-medium text-8xl",
                "text-gray-700 font-serif",
                "dark:text-gray-100"
            )}>
                I develop <span className={""}>on the web.</span>
            </h1>
            {/* Jumbotron introduction */}
            <h2 className={classNames(
                "mt-10",
                "text-4xl font-light font-sans",
                "text-gray-700",
                "dark:text-gray-200"
            )}
                style={{
                    lineHeight: 1.5
                }}
            >
                I&apos;m a self-taught Software Developer and a full-time Electrical Engineer, working at <a
                href={"https://www.unitedutilities.com/"}>United Utilities</a>.
                I blog about my projects and share tips about my latest hikes.
            </h2>
        </Container>
    )
}

export default Jumbotron;