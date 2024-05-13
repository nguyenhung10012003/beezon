import React from "react";
import {StarIcon} from "@heroicons/react/20/solid";


// generate rating
export const genRating = (rating, reviewsCount, iconSize) => {
    if (rating === 5) {
        return (
            <div className="flex">
                <StarIcon className={`text-yellow-300 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-yellow-300 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-yellow-300 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-yellow-300 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-yellow-300 w-${iconSize} h-${iconSize}`}/>

                {reviewsCount && (
                    <p className="ml-2 text-sm text-gray-900 dark:text-gray-400">{`(${reviewsCount})`}</p>
                )}
            </div>
        );
    }
    if (rating === 4) {
        return (
            <div className="flex">
                <StarIcon className={`text-yellow-300 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-yellow-300 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-yellow-300 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-yellow-300 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-gray-600 w-${iconSize} h-${iconSize}`}/>

                {reviewsCount && (
                    <p className="ml-2 text-sm text-gray-900 dark:text-gray-400">{`(${reviewsCount})`}</p>
                )}
            </div>
        );
    }
    if (rating === 3) {
        return (
            <div className="flex">
                <StarIcon className={`text-yellow-300 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-yellow-300 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-yellow-300 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-gray-600 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-gray-600 w-${iconSize} h-${iconSize}`}/>

                {reviewsCount && (
                    <p className="ml-2 text-sm text-gray-900 dark:text-gray-400">{`(${reviewsCount})`}</p>
                )}
            </div>
        );
    }
    if (rating === 2) {
        return (
            <div className="flex">
                <StarIcon className={`text-yellow-300 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-yellow-300 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-gray-600 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-gray-600 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-gray-600 w-${iconSize} h-${iconSize}`}/>

                {reviewsCount && (
                    <p className="ml-2 text-sm text-gray-900 dark:text-gray-400">{`(${reviewsCount})`}</p>
                )}
            </div>
        );
    }
    if (rating === 1) {
        return (
            <div className="flex">
                <StarIcon className={`text-yellow-300 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-gray-600 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-gray-600 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-gray-600 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-gray-600 w-${iconSize} h-${iconSize}`}/>

                {reviewsCount && (
                    <p className="ml-2 text-sm text-gray-900 dark:text-gray-400">{`(${reviewsCount})`}</p>
                )}
            </div>
        );
    }
    if (rating === 0) {
        return (
            <div className="flex items-center">
                <StarIcon className={`text-gray-600 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-gray-600 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-gray-600 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-gray-600 w-${iconSize} h-${iconSize}`}/>
                <StarIcon className={`text-gray-600 w-${iconSize} h-${iconSize}`}/>

                {reviewsCount && (
                    <p className="ml-2 text-sm text-gray-900 dark:text-gray-400">{`(${reviewsCount})`}</p>
                )}
            </div>
        );
    }
};
