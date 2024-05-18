import React, { useEffect, useContext, useState } from 'react'
import Contextpage from '../Contextpage';
import Moviecard from '../components/Moviecard';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
// import { Pagebtn } from '../components/Pagebtn';
import { Helmet } from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LiaUserFriendsSolid } from "react-icons/lia";
import AddFriendPopup from './AddFriendPopup';
import ConnectWithFriendsPopup from './ConnectWithFriendsPopup';

function FriendsRecommendations() {

    const { loader, page, setPage, fetchRecommendationByFriends, recommendedByFriends, totalPage } = useContext(Contextpage);
    const [addFriendsPopup, setAddFriendsPopup] = useState(false);

	const onCloseAddFriendsPopup = () => {
		setAddFriendsPopup(false)
	}
	useEffect(() => {
        setPage(1) // Reset Page to 1 on initial render.
    }, []);

    useEffect(() => {
        if (page > 0) {
            fetchRecommendationByFriends();
        }
    }, [page])


    return (
        <>
            <Helmet>
                <title>OneTV Movies | Recommended By Friends</title>
            </Helmet>

			<AddFriendPopup isOpen={addFriendsPopup} onClose={onCloseAddFriendsPopup}/>
			<ConnectWithFriendsPopup isOpen={addFriendsPopup} onClose={onCloseAddFriendsPopup}/>
            <div className='w-full bg-[#10141e] md:p-10 mb-20 md:mb-0'>
				<div className='connect-button'>
					<button className="absolute bg-black text-white p-2 z-20 right-0 top-10 m-10 rounded-full text-xl" onClick={() => setAddFriendsPopup(true)}> <LiaUserFriendsSolid/></button>				
				</div>
                <Header />
                <motion.div
                    layout
                    className="flex flex-wrap relative justify-evenly md:justify-around">
                    <AnimatePresence>
                        {
                            loader ? <span className="loader m-10"></span> :
                                <>
                                    {/* <InfiniteScroll
                                        className="w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around"
                                        dataLength={recommendedByFriends.length} //This is important field to render the next data
                                        next={() => setPage(page + 1)}
                                        hasMore={page < totalPage}
                                        loader={<span className="loader m-10"></span>}
                                        scrollThreshol={0.9}
                                        style={{ overflow: 'hidden' }}
                                    > */}

                                        {recommendedByFriends && recommendedByFriends.map((recommend) => (
                                            <Moviecard key={recommend.id} movie={recommend} />
                                        ))}

                                    {/* </InfiniteScroll> */}

                                </>
                        }
                    </AnimatePresence>
                </motion.div>
                {/* <Pagebtn /> */}

            </div>
        </>
    )
}

export default FriendsRecommendations
