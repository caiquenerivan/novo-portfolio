interface CategoriesHobbies {
    titlePt: string;
    titleEn: string;
    tag: string;
}

export const Categories = [
    {
      titlePt: "Música",
      titleEn: "Music",
      tag: "music",
    },
    {
      titlePt: "Cinema",
      titleEn: "Movies",
      tag: "movies",
    },
    {
      titlePt: "Esportes",
      titleEn: "Sports",
      tag: "sports",
    },
    {
      titlePt: "Games",
      titleEn: "Games",
      tag: "games",
    },
  ] as CategoriesHobbies[];

interface Hobbies {
    titlePt: string,
    titleEn: string,
    descPt: string,
    descEn: string,
    mainArtist: string,
    imageUrl: string,
    categorie: CategoriesHobbies,
    year: number,
    spotify: string,
    youtube: string,
    deezer: string,
    genre: string
}

export const HobbiesPost = [
    {
        titlePt: 'Damn',
        titleEn: 'Damn',
        descPt: 'Álbum de 2017 de Hip-Hop',
        descEn: 'Hip-hop album from 2017',
        mainArtist: 'Kendrick Lamar',
        imageUrl: 'https://i.pinimg.com/564x/68/b2/be/68b2be79042b3bd6a897541f90e2a2b8.jpg',
        categorie: Categories.find(category => category.tag === 'music') as CategoriesHobbies,
        year: 2017,
        spotify: 'https://open.spotify.com/album/4alcGHjstaALJHHiljfy3H?autoplay=true',
        youtube:'https://music.youtube.com/playlist?list=OLAK5uy_mWaHGXdNJMSE3hMxiM0R03vvYmIRskaNc&feature=gws_kp_album&feature=gws_kp_artist',
        deezer: 'https://www.deezer.com/album/39949511',
        genre: 'hip-hop'
    },
    {
        titlePt: 'To Pimp a Butterfly',
        titleEn: 'To Pimp a Butterfly',
        descPt: 'Álbum de 2015 de Hip-Hop',
        descEn: 'Hip-hop album from 2015',
        mainArtist: 'Kendrick Lamar',
        imageUrl: 'https://i.pinimg.com/564x/a7/b7/94/a7b79478cc4cc453ee421d6a1b9a339f.jpg',
        categorie: Categories.find(category => category.tag === 'music') as CategoriesHobbies,
        year: 2015,
        spotify: 'https://open.spotify.com/album/7ycBtnsMtyVbbwTfJwRjSP?autoplay=true',
        youtube:'https://music.youtube.com/playlist?list=OLAK5uy_n_dmtzA0IWImBN3fbUBUl_WgD-YSaMZaI&feature=gws_kp_album&feature=gws_kp_artist',
        deezer: 'https://www.deezer.com/album/9896728',
        genre: 'hip-hop'
    },
    {
        titlePt: 'Good Kid, M.A.A.D City',
        titleEn: 'Good Kid, M.A.A.D City',
        descPt: 'Álbum de 2012 de Hip-Hop',
        descEn: 'Hip-hop album from 2012',
        mainArtist: 'Kendrick Lamar',
        imageUrl: 'https://i.pinimg.com/564x/ef/b3/d1/efb3d193fe1aa2ca11862fd3314b2f7b.jpg',
        categorie: Categories.find(category => category.tag === 'music') as CategoriesHobbies,
        year: 2012,
        spotify: 'https://open.spotify.com/album/0QGCEo4rB9ADCzqA9I47f8?autoplay=true',
        youtube:'https://music.youtube.com/playlist?list=OLAK5uy_mhYMgh1v0LpLuS0FqC693tfVkyVZK9WSQ&feature=gws_kp_album&feature=gws_kp_artist',
        deezer: 'https://www.deezer.com/album/10222930',
        genre: 'hip-hop'
    },
    {
        titlePt: 'Mr. Morale & the Big Steppers',
        titleEn: 'Mr. Morale & the Big Steppers',
        descPt: 'Álbum de 2022 de Hip-Hop',
        descEn: 'Hip-hop album from 2022',
        mainArtist: 'Kendrick Lamar',
        imageUrl: 'https://i.pinimg.com/564x/ec/ca/8f/ecca8fa87be2494ca387ebcfe8046aa6.jpg',
        categorie: Categories.find(category => category.tag === 'music') as CategoriesHobbies,
        year: 2022,
        spotify: 'https://open.spotify.com/album/79ONNoS4M9tfIA1mYLBYVX?autoplay=true',
        youtube:'https://music.youtube.com/playlist?list=OLAK5uy_mdeH-JtTLsVGDionNbEvJGtQw--uolZy8&feature=gws_kp_album&feature=gws_kp_artist',
        deezer: 'https://www.deezer.com/album/318366617',
        genre: 'hip-hop'
    },
    {
        titlePt: 'Unorthodox Jukebox',
        titleEn: 'Unorthodox Jukebox',
        descPt: 'Álbum de 2012 de pop',
        descEn: 'Pop album from 2012',
        mainArtist: 'Bruno Mars',
        imageUrl: 'https://i.pinimg.com/564x/5b/17/74/5b177409a5069c8025981b8aa223e713.jpg',
        categorie: Categories.find(category => category.tag === 'music') as CategoriesHobbies,
        year: 2010,
        spotify: 'https://open.spotify.com/album/58ufpQsJ1DS5kq4hhzQDiI?autoplay=true',
        youtube:'https://music.youtube.com/playlist?list=OLAK5uy_mLH0dYTktVMApg7WdN5RHLckFIhj1K7JY&feature=gws_kp_album&feature=gws_kp_artist',
        deezer: 'https://www.deezer.com/album/53164122',
        genre: 'pop'
    },
    {
        titlePt: 'Doo-Wops & Hooligans',
        titleEn: 'Doo-Wops & Hooligans',
        descPt: 'Álbum de 2010 de Pop',
        descEn: 'Pop album from 2010',
        mainArtist: 'Bruno Mars',
        imageUrl: 'https://i.pinimg.com/564x/54/6b/c6/546bc61184e59409445401807e769835.jpg',
        categorie: Categories.find(category => category.tag === 'music') as CategoriesHobbies,
        year: 2010,
        spotify: 'https://open.spotify.com/album/6J84szYCnMfzEcvIcfWMFL?autoplay=true',
        youtube:'https://music.youtube.com/playlist?list=OLAK5uy_lnJ_8hSQo944mxD3ZukGe7_pv9d4gwY4E&feature=gws_kp_album&feature=gws_kp_artist',
        deezer: 'https://www.deezer.com/album/739505',
        genre: 'pop'
    },
    {
        titlePt: 'An Evening with Silk Sonic',
        titleEn: 'An Evening with Silk Sonic',
        descPt: 'Álbum de 2021 de Funk/Soul',
        descEn: 'Funk/Soul album from 2021',
        mainArtist: 'Silk Sonic',
        imageUrl: 'https://i.pinimg.com/564x/04/aa/10/04aa1057ea6df21c61dfbbb290c5fa8e.jpg',
        categorie: Categories.find(category => category.tag === 'music') as CategoriesHobbies,
        year: 2021,
        spotify: 'https://open.spotify.com/album/4VZ7jhV0wHpoNPCB7Vmiml?autoplay=true',
        youtube:'https://music.youtube.com/playlist?list=OLAK5uy_kBzTBvM4r8deUkSwranaPjaPRWx0v49gY&feature=gws_kp_album&feature=gws_kp_artist',
        deezer: 'https://www.deezer.com/album/300355247',
        genre: 'funk/soul'
    },
    {
        titlePt: '24K Magic',
        titleEn: '24K Magic',
        descPt: 'Álbum de 2016 de Pop',
        descEn: 'Pop album from 2016',
        mainArtist: 'Bruno Mars',
        imageUrl: 'https://i.pinimg.com/originals/8a/90/5b/8a905bc1126ef2fb0f8cd7a369f6b888.jpg',
        categorie: Categories.find(category => category.tag === 'music') as CategoriesHobbies,
        year: 2016,
        spotify: 'https://open.spotify.com/album/4PgleR09JVnm3zY1fW3XBA?autoplay=true',
        youtube:'https://music.youtube.com/playlist?list=OLAK5uy_nkOzLA76zVCUotP8td84Cvi4I788jjC1s&feature=gws_kp_album&feature=gws_kp_artist',
        deezer: 'https://www.deezer.com/album/14581500',
        genre: 'hip-hop'
    },
    {
        titlePt: 'Freudian',
        titleEn: 'Freudian',
        descPt: 'Álbum de 2017 de R&B',
        descEn: 'R&B album from 2017',
        mainArtist: 'Daniel Caesar',
        imageUrl: 'https://i.pinimg.com/736x/d2/5e/67/d25e67e31e0064debddff70c555d0002.jpg',
        categorie: Categories.find(category => category.tag === 'music') as CategoriesHobbies,
        year: 2017,
        spotify: 'https://open.spotify.com/album/3xybjP7r2VsWzwvDQipdM0?autoplay=true',
        youtube:'https://music.youtube.com/playlist?list=OLAK5uy_m4ef9CbQVqNjomB_Jps9wYIzgyP7Agsdk&feature=gws_kp_album&feature=gws_kp_artist',
        deezer: 'https://www.deezer.com/album/45620901',
        genre: 'r&b'
    },
    {
        titlePt: `Pilgrim's Paradise`,
        titleEn: `Pilgrim's Paradise`,
        descPt: 'Álbum de 2015 de R&B',
        descEn: 'R&B album from 2015',
        mainArtist: 'Daniel Caesar',
        imageUrl: 'https://i.pinimg.com/564x/39/d5/29/39d529dec2c317c30f84fd16dfdeafb9.jpg',
        categorie: Categories.find(category => category.tag === 'music') as CategoriesHobbies,
        year: 2015,
        spotify: 'https://open.spotify.com/album/4uP43hIpmEEDuW7aOfiU2C?autoplay=true',
        youtube:'https://music.youtube.com/playlist?list=OLAK5uy_nyTUiuCiFkZ-mfRpHJjNZ2mfZtbKRK-8E&feature=gws_kp_album&feature=gws_kp_artist',
        deezer: 'https://www.deezer.com/album/520047642'        ,
        genre: 'r&b'
    },
    {
        titlePt: 'SOS',
        titleEn: 'SOS',
        descPt: 'Álbum de 2022 de R&B',
        descEn: 'R&B album from 2022',
        mainArtist: 'Kendrick Lamar',
        imageUrl: 'https://i.pinimg.com/564x/68/b2/be/68b2be79042b3bd6a897541f90e2a2b8.jpg',
        categorie: Categories.find(category => category.tag === 'music') as CategoriesHobbies,
        year: 2022,
        spotify: 'https://open.spotify.com/album/07w0rG5TETcyihsEIZR3qG?autoplay=true',
        youtube:'https://music.youtube.com/playlist?list=OLAK5uy_mOMo8Ji8_xez5ZZPXnfxqGd_DGi03107c&feature=gws_kp_album&feature=gws_kp_artist',
        deezer: 'https://www.deezer.com/album/383703577',
        genre: 'r&b'
    },
    {
        titlePt: 'Bastardos Inglórios',
        titleEn: 'Inglorious Bastards',
        descPt: 'Filme de 2009 que se passa durante a segunda guerra mundial.',
        descEn: '2019 film set during World War II.',
        mainArtist: '',
        imageUrl: 'https://i.pinimg.com/564x/68/b2/be/68b2be79042b3bd6a897541f90e2a2b8.jpg',
        categorie: Categories.find(category => category.tag === 'music') as CategoriesHobbies,
        year: 2022,
        spotify: 'https://open.spotify.com/album/07w0rG5TETcyihsEIZR3qG?autoplay=true',
        youtube:'https://music.youtube.com/playlist?list=OLAK5uy_mOMo8Ji8_xez5ZZPXnfxqGd_DGi03107c&feature=gws_kp_album&feature=gws_kp_artist',
        deezer: 'https://www.deezer.com/album/383703577',
        genre: 'r&b'
    },




] as Hobbies[];