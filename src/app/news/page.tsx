"use client";
import React, { useState, useEffect } from "react";
import ClientLayout from "../components/Layout/Layout";

interface NewsItem {
    id: string;
    title: string;
    description: string;
    timeAgo: string;
    imageUrl: string;
}

const NewsPage: React.FC = () => {
    const [newsData, setNewsData] = useState<NewsItem[]>([]);
    const [expanded, setExpanded] = useState(false);

    const sampleData: NewsItem[] = [
        {
            id: "1",
            title: "The Future of Renewable Energy: Innovations and Challenges Ahead",
            description: "The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.",
            timeAgo: "a few seconds",
            imageUrl: "https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-1.webp",
        },
        {
            id: "2",
            title: "Exploring the Impact of Artificial Intelligence on Modern Healthcare",
            description: "She eagerly opened the gift, her eyes sparkling with excitement.",
            timeAgo: "a day",
            imageUrl: "https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-2.webp",
        },
        {
            id: "3",
            title: "Climate Change and Its Effects on Global Food Security",
            description: "The old oak tree stood tall and majestic, its branches swaying gently in the breeze.",
            timeAgo: "2 days",
            imageUrl: "https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-3.webp",
        },
        {
            id: "4",
            title: "The Rise of Remote Work: Benefits, Challenges, and Future Trends",
            description: "The aroma of freshly brewed coffee filled the air, awakening my senses.",
            timeAgo: "3 days",
            imageUrl: "https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-4.webp",
        },
        {
            id: "5",
            title: "Understanding Blockchain Technology: Beyond Cryptocurrency",
            description: "The children giggled with joy as they ran through the sprinklers on a hot summer day.",
            timeAgo: "4 days",
            imageUrl: "https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-5.webp",
        },
    ];

    // Comment out the fetchData function
    /*
    const fetchData = async () => {
      try {
        const response = await fetch("API_ENDPOINT_HERE");
        if (!response.ok) throw new Error("Failed to fetch news");
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    */

    useEffect(() => {
        setNewsData(sampleData);
    }, []);

    const visibleNews = expanded ? newsData : newsData.slice(0, 3);

    return (
        <ClientLayout>
            <div className="p-4 sm:p-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-950">
                    <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white m-0">
                            News
                        </h3>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto scrollbar-hidden">
                        {visibleNews.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center p-2 sm:p-3 border-b border-gray-100 dark:border-gray-700"
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-10 h-10 rounded-full mr-3 sm:mr-4 object-cover"
                                />
                                <div className="flex-1 overflow-hidden">
                                    <a
                                        href="#"
                                        className="text-sm sm:text-base font-medium text-gray-900 dark:text-white no-underline block whitespace-nowrap overflow-hidden text-ellipsis hover:underline"
                                    >
                                        {item.title}
                                    </a>
                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 m-0 whitespace-nowrap overflow-hidden text-ellipsis">
                                        {item.description}
                                    </p>
                                </div>
                                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 ml-auto">
                                    {item.timeAgo}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="p-2 sm:p-3 flex justify-end">
                        <button
                            className="bg-none border-none text-gray-500 dark:text-gray-400 cursor-pointer text-xs sm:text-sm flex items-center gap-1 hover:bg-opacity-700"
                            onClick={() => setExpanded(!expanded)}
                        >
                            View all <span> > </span>
                        </button>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
};

export default NewsPage;