import FeaturedCard from "./FeaturedCard";

const FeaturedLinks = () => {
    const links = [
        {
            name: 'Github',
            abstract: 'Github is where you can find my open source projects and portfolio. Click to see my profile.',
            tags: [],
            href: 'https://github.com/James-buzz',
            imageURL: '/assets/modules/home/github.jpg'
        },
        {
            name: 'LinkedIn',
            abstract: 'LinkedIn is where you can learn about my work experience and connect with me professionally. Click to see my LinkedIn.',
            tags: ['java', 'ui'],
            href: 'https://www.linkedin.com/in/james-lomax/',
            imageURL: '/assets/modules/home/linkedin.jpg'
        }
    ]
    return (
        <>
            {links.map((link, key)=> (
                <div className={"col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-6"} key={key}>
                    <FeaturedCard
                        link={link.href}
                        title={link.name}
                        backgroundURL={link.imageURL}
                        abstract={link.abstract}
                        small={true}
                    />
                </div>
            ))}

        </>
    )
}

export default FeaturedLinks;