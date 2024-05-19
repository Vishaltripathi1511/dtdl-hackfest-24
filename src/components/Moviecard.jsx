import React, { useState, useEffect ,useContext, Fragment} from 'react'
import { Link } from 'react-router-dom'
import noimage from '../assets/images/no-image.jpg'
import { motion } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { AiFillStar, AiOutlineStar} from 'react-icons/ai';
import { LiaUserFriendsSolid } from "react-icons/lia";
import { toast } from 'react-toastify';
import Contextpage from '../Contextpage';
import AddFriendPopup from './AddFriendPopup';

function Moviecard({ movie }) {
    const { user } = useContext(Contextpage);

    const [isBookmarked, setIsBookmarked] = useState(null);
    const [recommendToFriendPopup, setRecommendToFriendPopup] = useState(false);
	
    useEffect(() => {
        if (localStorage.getItem(movie.id)) {
            setIsBookmarked(true);
        } else {
            setIsBookmarked(false);
        }
    }, [movie.id]);

    const BookmarkMovie = () => {
        setIsBookmarked(!isBookmarked)
        if (isBookmarked) {
            localStorage.removeItem(movie.id);
        } else {
            localStorage.setItem(movie.id, JSON.stringify(movie));
        }
    }
	
	const setViewed = () => {
		fetch(
			`http://localhost:8080/recommendation/view?movieId=${movie.id}`,
			{
				method: 'GET',
				headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaHVua3kuZ3VwdGEiLCJpYXQiOjE3MTYwODM0MzIsImV4cCI6MTcxNjE3MzQzMn0.MCNTV_6y2j9c0lUywHyfh4bAdYG37imo7BitD9JTCEw'}
			}
		);
  
	}

	const onCloseRecommendToFriendPopup = () => {
		setRecommendToFriendPopup(false)
	}

	return (
		<Fragment>
		<AddFriendPopup isOpen={recommendToFriendPopup} onClose={onCloseRecommendToFriendPopup}/>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            layout
            className="card relative w-full md:w-60 h-[410px] md:h-[360px] my-3 mx-4 md:my-5 md:mx-0 cursor-pointer rounded-xl overflow-hidden"
			onClick={setViewed}>
            
            {/* bookmark buttons */}
            <button className="absolute bg-black text-white p-2 z-20 right-0 m-3 rounded-full text-xl" onClick={BookmarkMovie}> {isBookmarked ? <AiFillStar /> : <AiOutlineStar/>}</button>
            <button className="absolute bg-black text-white p-2 z-20 right-0 top-10 m-3 rounded-full text-xl" onClick={() => setRecommendToFriendPopup(true)}> <LiaUserFriendsSolid/></button>

            
            <div className='absolute bottom-0 w-full flex justify-between items-end p-3 z-20'>
                <h1 className='text-white text-xl font-semibold  break-normal break-words'>{movie.title || movie.name}</h1>

                {(movie.vote_average||0) > 7 ? <h1 className='font-bold text-green-500 p-2 bg-zinc-900 rounded-full'>{(movie.vote_average||0).toFixed(1)}</h1> : (movie.vote_average||0) > 5.5 ? <h1 className='font-bold text-orange-400 p-2 bg-zinc-900 rounded-full'>{(movie.vote_average||0).toFixed(1)}</h1> : <h1 className='font-bold text-red-600 p-2 bg-zinc-900 rounded-full'>{(movie.vote_average||0).toFixed(1)}</h1>}
            </div>

            <Link to={`/moviedetail/${movie.id}`} className='h-full w-full shadow absolute z-10'></Link>

            <div>
                {movie.poster_path === null ? <img className='img object-cover' src={noimage} /> :
                    <LazyLoadImage effect='blur' className='img object-cover' src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />}
            </div>
        </motion.div>
		</Fragment>
    )
}

export default Moviecard
