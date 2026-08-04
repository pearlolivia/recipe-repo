import { Icon, IconProps } from "@tabler/icons-react"

export type IconComponent = React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>

export type Link = {
    text: string
    link: string
    icon?: IconComponent
    iconFilled?: IconComponent
}

export type Layout = 'app' | 'admin'