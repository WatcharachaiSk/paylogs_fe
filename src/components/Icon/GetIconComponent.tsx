import * as MdIcons from "react-icons/md";
import { IconType } from "react-icons";

type Props = {
  iconName: string;
} & React.ComponentProps<IconType>; // << ใช้ IconType แทน SVGProps

export function GetIconComponent({ iconName, ...props }: Props) {
  const Icon = MdIcons[iconName as keyof typeof MdIcons];
  return Icon ? <Icon {...props} /> : null;
}