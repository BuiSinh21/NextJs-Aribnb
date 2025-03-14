"use client"

import { TbBeach, TbMountain, TbPool } from "react-icons/tb"
import Container from "../Container"
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi"
import { MdOutlineVilla } from "react-icons/md"
import CategoryBox from "../CategoryBox"
import { usePathname, useSearchParams } from "next/navigation"
import { FaSkiing } from "react-icons/fa"
import { BsSnow } from "react-icons/bs"
import { IoDiamond } from "react-icons/io5"
 export const  categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        decription: 'This property is close to the beach!'
    },

    {
        label: 'Windmills',
        icon: GiWindmill,
        decription: 'This property has windmills!'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        decription: 'This property is modern!'
    },
    {
        label: 'CountrySide',
        icon: TbMountain,
        decription: 'This property is in the countryside!'
    },
    {
        label: 'Pools',
        icon: TbPool,
        decription: 'This property is on an isLand!'
    },
    {
        label: 'Islands',
        icon: GiBoatFishing,
        decription: 'This property is close to a lake!'
    },
    {
        label: 'Sikiing',
        icon: FaSkiing,
        decription: 'This property has skiing activities!'
    },
    {
        label: 'Castles',
        icon: GiCastle,
        decription: 'This property has skiing activities!'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        decription: 'This property has camping activities!'
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        decription: 'This property has camping activities!'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        decription: 'This property is in a cave!'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        decription: 'This property is in the  desert!'
    },
    {
        label: 'Barns',
        icon: GiBarn,
        decription: 'This property is in the barn!'
    },
    {
        label: 'Lux',
        icon:  IoDiamond,
        decription: 'This property is luxurious!'
    },

]
const Catagories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname==="/"
    if(!isMainPage)
        {
            return null;
        }
    return (
        <div>
            <Container>
                <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                   {categories.map(item =>
                    <CategoryBox 
                        key ={item.label}
                        label ={item.label}
                        selected={category == item.label}
                        Icon={item.icon}
                    />
                   )} 
                </div>
            </Container>
        </div>
    )
}

export default Catagories
