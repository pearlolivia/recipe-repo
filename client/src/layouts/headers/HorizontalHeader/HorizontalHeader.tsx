import { IconUser } from "@tabler/icons-react"

import { Link } from "@/layouts/helpers"

const HorizontalHeader = ({links, logo}: {links: Link[]; logo: string}) => (
    <div className="flex sticky top-0 p-4">
        <img
            src={logo}
            alt={logo}
        />
        <div className="flex items-center ml-auto gap-x-4">
            {links.map((link) => (
                <a href={link.link}>
                    <div>
                        {link.text}
                    </div>
                </a>
            ))}
            <div className="p-2 rounded-full bg-neutral-500">
                <IconUser />
            </div>
        </div>
    </div>
)

export default HorizontalHeader