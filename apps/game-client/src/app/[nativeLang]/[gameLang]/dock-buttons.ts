import { AiFillHeart, AiFillHome, AiOutlineHeart, AiOutlineHome } from 'react-icons/ai';
import { BiSolidUserCircle, BiUserCircle } from 'react-icons/bi';
import { FiMoreHorizontal } from 'react-icons/fi';
import { RiSearchFill, RiSearchLine } from 'react-icons/ri';

/**                                  dock
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 **/
export const dockButtons = [
  {
    href: '/en/ka',
    iconActive: AiFillHome,
    iconInactive: AiOutlineHome,
    label: 'Hub',
  },
  {
    href: '/en/ka/me',
    iconActive: BiSolidUserCircle,
    iconInactive: BiUserCircle,
    label: 'Profile',
  },
  {
    href: '/en/ka/saved',
    iconActive: AiFillHeart,
    iconInactive: AiOutlineHeart,
    label: 'Saved',
  },
  {
    href: '/en/ka/search',
    iconActive: RiSearchFill,
    iconInactive: RiSearchLine,
    label: 'Search',
  },
  {
    href: '/en/ka/more',
    iconActive: FiMoreHorizontal,
    iconInactive: FiMoreHorizontal,
    label: 'More',
  },
];
