import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { Box, Text, VStack, Fab, Icon, Center } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { setMovieData, setPage } from '../redux/movieAction';
import MovieItem from './MovieItem';

const MainPage = ({ navigation }) => {
    const movieData = useSelector((state) => state.movieData);
    const page = useSelector((state) => state.page);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = () => {
        fetch(`https://moviesdatabase.p.rapidapi.com/titles?list=most_pop_movies&limit=15&page=${page}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '4b4c21675emsh25a2d641c324102p11ac16jsn400919ab8d30',
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                dispatch(setMovieData(movieData ? [...movieData, ...data.results] : data.results));
                dispatch(setPage(page + 1));
            })
            .catch((error) => console.error(error));
    };

    const renderMovieItem = useMemo(() => {
        return ({ item }) => {
            return <MovieItem item={item} />;
        };
    }, []);

    return (
        <Box backgroundColor={'black'} flex={1} pt={20}>
            <VStack alignItems={'center'}>
                <Text color={'white'}>Hello 👋, movieDB was down so i used different api for movies from rapidApi</Text>
                <Text fontSize="2xl" color={'lime.200'}>
                    Top Movies
                </Text>
                <Text color={'white'}>Here are the top movies with pagination</Text>
                <Text color={'white'}>Click on Fab for search movie screen</Text>
            </VStack>
            {movieData ? (
                <FlatList
                    data={movieData}
                    renderItem={renderMovieItem}
                    keyExtractor={(item) => item.id}
                    onEndReached={fetchMovies}
                    onEndReachedThreshold={0.5}
                />
            ) : (
                <Center flex={1}>
                    <ActivityIndicator color={'#c2f63f'} size={'large'} />
                </Center>
            )}
            <Fab
                position="absolute"
                renderInPortal={false}
                size="sm"
                icon={<Ionicons name="search" size={32} color="black" />}
                backgroundColor={'#c2f63f'}
                bottom={5}
                right={6}
                onPress={() => navigation.navigate('Search')}
            />
        </Box>
    );
};

export default MainPage;
