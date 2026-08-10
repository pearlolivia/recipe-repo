import { IconUser } from "@tabler/icons-react"

import { Link } from "@/layouts/helpers"

const HorizontalHeader = ({links, logo}: {links: Link[]; logo: string}) => (
    <div className="hidden md:flex sticky top-0 p-4 border-b">
        <img
            src={logo}
            alt={logo}
        />
        <div className="flex items-center ml-auto gap-x-4">
            {links.map((link) => (
                <a href={link.link} className="font-base text-neutral-900 hover:text-wine-700">
                    <div>
                        {link.text}
                    </div>
                </a>
            ))}
        </div>
    </div>
)

export default HorizontalHeader