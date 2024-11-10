import { CiSearch } from 'react-icons/ci'
import { GoHeart } from 'react-icons/go'
import { TbArrowsShuffle } from 'react-icons/tb'

const HoverButtons = () => {
    return (
        <>
            <div className="absolute right-4 top-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white rounded-lg shadow-lg flex flex-col gap-1">
                    <button
                        className="p-2 hover:bg-gray-100 transition-colors rounded-t-lg"
                        aria-label="Compare product"
                    >
                        <TbArrowsShuffle className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                        className="p-2 hover:bg-gray-100 transition-colors"
                        aria-label="Quick view"
                    >
                        <CiSearch className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                        className="p-2 hover:bg-gray-100 transition-colors rounded-b-lg"
                        aria-label="Add to wishlist"
                    >
                        <GoHeart className="w-5 h-5 text-gray-700" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default HoverButtons
