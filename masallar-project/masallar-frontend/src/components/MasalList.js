import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Container, Grid, Card, CardContent, CardMedia, Typography,
  Button, Dialog, DialogContent, FormControl, InputLabel,
  Select, MenuItem, Box, IconButton, TextField, DialogActions
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import CloseIcon from '@mui/icons-material/Close';


const kategoriler = [
  'Klasik Çocuk Masalları',
  'Eğitici Masallar',
  'Hayvan Masalları',
  'Keloğlan Masalları',
  'Fantastik Masallar'
];


const masallar = [
  {
    id: 1,
    baslik: "Kırmızı Başlıklı Kız",
    resimler: [
      "/images/masallar/kirmizi-baslikli-kiz-1.jpg",
      "/images/masallar/kirmizi-baslikli-kiz-2.jpg",
      "/images/masallar/kirmizi-baslikli-kiz-3.jpg",
      "/images/masallar/kirmizi-baslikli-kiz-4.jpg",
      "/images/masallar/kirmizi-baslikli-kiz-5.jpg"
    ],
    sure: "8 dakika",
    audioUrl: "/audio/kirmizi-baslikli-kiz.mp3",
    kategori: "Klasik Çocuk Masalları",
    textUrl: "/texts/kirmizi-baslikli-kiz.txt"
  },
{
  id: 2,
  baslik: "Bremen Mızıkacıları",
  resimler: [
    "/images/masallar/bremen-mizikacilari-1.jpg",
    "/images/masallar/bremen-mizikacilari-2.jpg",
    "/images/masallar/bremen-mizikacilari-3.jpg",
    "/images/masallar/bremen-mizikacilari-4.jpg",
    "/images/masallar/bremen-mizikacilari-5.jpg"
  ],
  sure: "16 dakika",
  audioUrl: "/audio/bremen-mizikacilari.mp3",
  kategori: "Hayvan Masalları",
  textUrl: "/texts/bremen-mizikacilari.txt"
},
{
  id: 3,
  baslik: "Pinokyo",
  resimler: [
    "/images/masallar/pinokyo-1.jpg",
    "/images/masallar/pinokyo-2.jpg",
    "/images/masallar/pinokyo-3.jpg",
    "/images/masallar/pinokyo-4.jpg",
    "/images/masallar/pinokyo-5.jpg"
  ],
  sure: "6 dakika",
  audioUrl: "/audio/pinokyo.mp3",
  kategori: "Klasik Çocuk Masalları",
  textUrl: "/texts/pinokyo.txt"
},
{
  id: 4,
  baslik: "Uyuyan Güzel",
  resimler: [
    "/images/masallar/uyuyan-guzel-1.JPG",
    "/images/masallar/uyuyan-guzel-2.JPG",
    "/images/masallar/uyuyan-guzel-3.jpg",
    "/images/masallar/uyuyan-guzel-4.JPG"
  ],
  sure: "7 dakika",
  audioUrl: "/audio/uyuyan-guzel.mp3",
  kategori: "Klasik Çocuk Masalları",
  textUrl: "/texts/uyuyan-guzel.txt"
},
{
  id: 5,
  baslik: "Pijamalı Korsanlar",
  resimler: [
    "/images/masallar/pijamali-korsanlar-1.jpg",
    "/images/masallar/pijamali-korsanlar-2.jpg",
    "/images/masallar/pijamali-korsanlar-3.jpg",
    "/images/masallar/pijamali-korsanlar-4.jpg",
    "/images/masallar/pijamali-korsanlar-5.jpg",
    "/images/masallar/pijamali-korsanlar-6.jpg",
    "/images/masallar/pijamali-korsanlar-7.jpg",
    "/images/masallar/pijamali-korsanlar-8.jpg",
    "/images/masallar/pijamali-korsanlar-9.jpg"
  ],
  sure: "6 dakika",
  audioUrl: "/audio/pijamali-korsanlar.mp3",
  kategori: "Fantastik Masallar",
  textUrl: "/texts/pijamali-korsanlar.txt"
},
{
  id: 6,
  baslik: "Sevimli Panda",
  resimler: [
    "/images/masallar/panda (1).jpg",
    "/images/masallar/panda (2).jpg",
    "/images/masallar/panda (3).jpg",
    "/images/masallar/panda (4).jpg",
    "/images/masallar/panda (5).jpg"
  ],
  sure: "8 dakika",
  audioUrl: "/audio/panda.mp3",
  kategori: "Hayvan Masalları",
  textUrl: "/texts/panda.txt"
},
{
  id: 7,
  baslik: "Keloğlan-Su Kanalı",
  resimler: [
    "/images/masallar/sukanali1.jpg",
    "/images/masallar/sukanali2.jpg",
    "/images/masallar/sukanali3.jpg",
    "/images/masallar/sukanali4.jpg",
    "/images/masallar/sukanali5.jpg"
  ],
  sure: "8 dakika",
  audioUrl: "/audio/sukanali.mp3",
  kategori: "Keloğlan Masalları",
  textUrl: "/texts/sukanali.txt"
},
{
  id: 8,
  baslik: "Keloğlan ile Yaver",
  resimler: [
    "/images/masallar/yaver-1.jpg",
    "/images/masallar/yaver-2.jpg",
    "/images/masallar/yaver-3.jpg",
    "/images/masallar/yaver-4.jpg",
    "/images/masallar/yaver-5.jpg"
  ],
  sure: "6 dakika",
  audioUrl: "/audio/yaver.mp3",
  kategori: "Keloğlan Masalları",
  textUrl: "/texts/yaver.txt"
},

{
  id: 9,
  baslik: "Zeynep ve Altın Balık",
  resimler: [
    "/images/masallar/zeynep1.jpg",
    "/images/masallar/zeynep2.jpg",
    "/images/masallar/zeynep3.jpg",
    "/images/masallar/zeynep4.jpg",
    "/images/masallar/zeynep5.jpg",
    "/images/masallar/zeynep6.jpg",
    "/images/masallar/zeynep7.jpg",
    "/images/masallar/zeynep8.jpg",
    "/images/masallar/zeynep9.jpg",
  ],
  sure: "6 dakika",
  audioUrl: "/audio/zeynep.mp3",
  kategori: "Fantastik Masallar",
  textUrl: "/texts/zeynep.txt"
},
{
  id: 10,
  baslik: "Fener",
  resimler: [
    "/images/masallar/fener1.jpg",
    "/images/masallar/fener2.jpg",
    "/images/masallar/fener3.jpg",
    "/images/masallar/fener4.jpg",
    "/images/masallar/fener5.jpg",
    "/images/masallar/fener6.jpg",
    "/images/masallar/fener7.jpg",
    "/images/masallar/fener8.jpg",
    "/images/masallar/fener9.jpg",
  ],
  sure: "5 dakika",
  audioUrl: "/audio/fener.mp3",
  kategori: "Fantastik Masallar",
  textUrl: "/texts/fener.txt"
},
{
  id: 11,
  baslik: "Keleş Oğlan",
  resimler: [
    "/images/masallar/kel-1.jpg",
    "/images/masallar/kel-2.jpg",
    "/images/masallar/kel-3.jpg",
    "/images/masallar/kel-4.jpg",
    "/images/masallar/kel-5.jpg"
  ],
  sure: "6 dakika",
  audioUrl: "/audio/kel.mp3",
  kategori: "Keloğlan Masalları",
  textUrl: "/texts/kel.txt"
},

{
  id: 12,
  baslik: "Hansel ile Gretel",
  resimler: [
    "/images/masallar/hansel1.jpg",
    "/images/masallar/hansel2.jpg",
    "/images/masallar/hansel3.jpg",
    "/images/masallar/hansel4.jpg",
    "/images/masallar/hansel5.jpg"
  ],
  sure: "6 dakika",
  audioUrl: "/audio/hansel.mp3",
  kategori: "Klasik Çocuk Masalları",
  textUrl: "/texts/hansel.txt"
},
{
  id: 13,
  baslik: "Tavşan ile Kirpi",
  resimler: [
    "/images/masallar/tavsan1.jpg",
    "/images/masallar/tavsan2.jpg",
    "/images/masallar/tavsan3.jpg",
  
  ],
  sure: "6 dakika",
  audioUrl: "/audio/tavsan.mp3",
  kategori: "Eğitici Masallar",
  textUrl: "/texts/tavsan.txt"
}

];



const MasalList = ({ type = 'dinle',darkMode }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMasal, setSelectedMasal] = useState(null);
  const [kategori, setKategori] = useState('');
  const [masalMetni, setMasalMetni] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogImageIndex, setDialogImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [favoriler, setFavoriler] = useState([]);
  const [listenHistory, setListenHistory] = useState([]);

 
  const fetchFavoriler = () => {
    if (!currentUser) return;
    fetch(`http://localhost:8081/api/favorites/user/${currentUser.id}`)
      .then(res => res.json())
      .then(data => {
        const favoriIdListesi = data.map(fav => fav.taleId);
        setFavoriler(favoriIdListesi);
        localStorage.setItem(`favoriler_${currentUser.id}`, JSON.stringify(favoriIdListesi));
      })
      .catch(err => {
        setFavoriler([]);
        localStorage.setItem(`favoriler_${currentUser.id}`, JSON.stringify([]));
      });
  };
    
useEffect(() => {
  if (currentUser) {
      fetchFavoriler();
  } else {
    setFavoriler([]);
  }
}, [currentUser]);

useEffect(() => {
  if (currentUser) {
    const savedHistory = localStorage.getItem(`history_${currentUser.id}`);
    if (!savedHistory) {
      localStorage.setItem(`history_${currentUser.id}`, JSON.stringify([]));
    }
    setListenHistory(savedHistory ? JSON.parse(savedHistory) : []);
  } else {
    setListenHistory([]);
  }
}, [currentUser]);

  useEffect(() => {
    let timer;
    if (openDialog && selectedMasal) {
      timer = setInterval(() => {
        setDialogImageIndex((prev) => (prev + 1) % selectedMasal.resimler.length);
      }, 9000);
    }
    return () => clearInterval(timer);
  }, [openDialog, selectedMasal]);

  

  const handleFavori = async (masalId, event) => {
    if (!currentUser) {
      navigate('/giris');
      return;
    }
    const favoriVarMi = favoriler.includes(masalId);
    try {
      if (favoriVarMi) {
        await fetch(`http://localhost:8081/api/favorites/${currentUser.id}/${masalId}`, {
          method: 'DELETE'
        });
      } else {
        await fetch('http://localhost:8081/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: currentUser.id,
            taleId: masalId
          })
        });
      }
      fetchFavoriler();
    } catch (err) {
      alert('Favori ekleme/çıkarma sırasında hata oluştu!');
    }
  };

  const addToHistory = async (masal) => {
    if (!currentUser) return;
    await fetch('http://localhost:8081/api/listening-history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: currentUser.id,
        taleId: masal.id,
        tarih: new Date().toISOString()
      })
    });
    const newHistory = [
      {
        id: masal.id,
        baslik: masal.baslik,
        resimler: masal.resimler,
        audioUrl: masal.audioUrl,
        textUrl: masal.textUrl,
        tarih: new Date().toISOString()
      },
      ...listenHistory.filter(item => item.id !== masal.id)
    ].slice(0, 10);
    setListenHistory(newHistory);
    localStorage.setItem(`history_${currentUser.id}`, JSON.stringify(newHistory));
  };

  const handleMasalAc = async (masal, actionType) => {
    setSelectedMasal(masal);
    setOpenDialog(true);
    setDialogImageIndex(0);
    setIsPlaying(actionType === 'dinle');
    setIsFullScreen(false);
    if (actionType === 'dinle') {
      setMasalMetni('');
      if (currentUser) {
          addToHistory(masal);
      }
    } else if (actionType === 'oku') {
      const response = await fetch(masal.textUrl);
      const text = await response.text();
      setMasalMetni(text);
      if (currentUser) {
          addToHistory(masal);
      }
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedMasal(null);
    setMasalMetni('');
    setIsPlaying(false);
    setDialogImageIndex(0);
    setIsFullScreen(false);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const filteredMasallar = masallar.filter(masal => {
    const matchesSearch = masal.baslik.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !kategori || masal.kategori === kategori;
    
    if (type === 'favoriler') {
      return favoriler.includes(masal.id) && matchesSearch && matchesCategory;
    }
    if (type === 'gecmis') {
      return listenHistory.some(item => item.id === masal.id) && matchesSearch && matchesCategory;
    }
    return matchesSearch && matchesCategory;
  });

  
  return (
    <Container
    maxWidth={false}
    disableGutters
    sx={{
      py: 4,
      paddingTop: '20px',
      backgroundColor: darkMode ? 'rgb(11, 40, 94)' : 'rgb(238, 228, 89)',
      minHeight: '100vh',
      width: '100vw',
      boxSizing: 'border-box',
      paddingLeft: 0,
      paddingRight: 0,
      margin: 0,
    }}
  >
    <Typography 
      variant="h4" 
      align="center" 
      sx={{ 
        mb: 4, 
        color: darkMode ? 'rgba(199, 172, 19, 0.99)' : 'rgba(231, 84, 39, 0.93)', 
        fontFamily: 'Comic Sans MS',
        textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
      }}
    >{type === 'favoriler' ? 'FAVORİ MASALLARIM' : 
      type === 'gecmis' ? 'DİNLEME GEÇMİŞİM' :
      type === 'oku' ? 'MASAL OKU' : 'MASAL DİNLE'}
   </Typography>
   <Box sx={{ 
  display: 'flex', 
  gap: 4, 
  mb: 4,
  justifyContent: 'space-between', 
  alignItems: 'center',
  width: '100%',
  px: { xs: 2, md: 6 } 
}}>
  
  
  <FormControl
  sx={{
    minwidth: '200px',
    width: 'auto',
    '& .MuiInputBase-root': {
      borderRadius: '20px',
      height: '40px',
      backgroundColor: '#e6d98a', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      '&:hover': {
        boxShadow: '0 4px 6px rgba(0,0,0,0.15)'
      }
    },
    '& .MuiSelect-select': {
      fontSize: '15px',
      color: '#444', 
      fontWeight: 700,
      fontFamily: 'Comic Sans MS',
      letterSpacing: '0.5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      minHeight: '40px'
    },
    '& .MuiSelect-icon': {
      color: '#444', 
      top: '50%',
      transform: 'translateY(-50%)'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'gray'
    }
  }}
>
    <Select
      value={kategori}
    displayEmpty
      onChange={(e) => setKategori(e.target.value)}
    sx={{ minWidth: '200px', 
      width: 'auto',
      textAlign: 'center',
      pl: 0, 
      whiteSpace: 'nowrap', 
    }}
    renderValue={
      kategori !== '' ? undefined : () => (
        <span style={{
          color: '#444',
          fontWeight: 700,
          fontFamily: 'Comic Sans MS',
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}>
          Kategori
        </span>
      )
    }
    >
      <MenuItem value="" sx={{ 
      fontSize: '18px',
      fontFamily: 'Comic Sans MS',
      color: '#444',
      fontWeight: 700,
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      Kategori
      </MenuItem>
      {kategoriler.map(kat => (
        <MenuItem 
          key={kat} 
          value={kat}
          sx={{ 
          fontSize: '18px',
            fontFamily: 'Comic Sans MS',
          color: '#444',
          fontWeight: 700,
          justifyContent: 'center',
          textAlign: 'center'
          }}
        >
          {kat}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

 
  <TextField
    placeholder="Masal Ara..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    autoComplete="off" 
    InputProps={{
      startAdornment: <SearchIcon sx={{ color: 'rgba(17, 17, 17, 0.94)', mr: 1, fontSize: '20px' }} />,
    }}
    sx={{ 
      width: '200px',
      '& .MuiInputBase-input::placeholder': {
        color: '#444', 
        opacity: 1,
        fontWeight: 600,
        letterSpacing: '0.5px',
        textAlign: 'center' 
      },
      '& .MuiInputBase-root': {
        borderRadius: '20px',
        height: '40px',
        backgroundColor: 'rgba(236, 230, 139, 0.94)',
        boxShadow: '0 3px 4px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          boxShadow: '0 4px 6px rgba(0,0,0,0.15)'
        }
      },
      '& .MuiSelect-select': {
      fontSize: '14px',
      color: '#666',
      fontFamily: 'Comic Sans MS'
    },
    '& .MuiInputLabel-root': {
      fontSize: '14px',
      color: '#888',
      fontFamily: 'Comic Sans MS'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'gray'
      }
    }}
  />
</Box>
<Grid container spacing={10} sx={{ px: { xs: 2, md: 6 } }}>
        {filteredMasallar.map((masal) => (
          <Grid item key={masal.id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                backgroundColor: darkMode ? 'rgba(245, 232, 176, 0.93)' : 'rgba(245, 232, 176, 0.93)', 
                flexDirection: 'column',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.2)'
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={masal.resimler[0]}
                alt={masal.baslik}
                sx={{ 
                  objectFit: 'cover',
                  borderTopLeftRadius: '15px',
                  borderTopRightRadius: '15px'
                }}
              />
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', position: 'relative' }}>
                <IconButton
                  onClick={(e) => handleFavori(masal.id, e)}
                  sx={{
                    position: 'absolute',
                    color: darkMode ? '#8b4513' : 'inherit' ,
                    right: 8,
                    top: 8
                  }}
                >
                  {favoriler.includes(masal.id) ? (
                    <FavoriteIcon sx={{ color: '#ff1744' }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: '#ff1744' }} />
                  )}
                </IconButton>
                
                <Typography 
                  gutterBottom 
                  variant="h5" 
                  sx={{ 
                    fontFamily: 'Comic Sans MS',
                    color: 'coral'
                  }}
                >
                  {masal.baslik}
                </Typography>
                
                {type === 'gecmis' && (
                  <Typography 
                    sx={{ 
                      mb: 1,
                      color: '#666',
                      fontSize: '0.9rem'
                    }}
                  >
                    Dinlenme zamanı: {new Date(listenHistory.find(h => h.id === masal.id)?.tarih).toLocaleDateString('tr-TR')}
                  </Typography>
                )}
                
                <Typography sx={{ mb: 2, color: '#666' }}>
                  Süre: {masal.sure}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  {(type === 'dinle' || type === 'favoriler' || type === 'gecmis') && (
                    <Button 
                      variant="contained" 
                      onClick={() => handleMasalAc(masal, 'dinle')}
                      startIcon={<HeadphonesIcon />}
                      sx={{ color: 'rgb(13, 13, 14)',
                        backgroundColor: 'rgb(215, 186, 221)',
                        borderRadius: '20px',
                        '&:hover': {
                          backgroundColor: 'rgb(203, 60, 231)'
                          
                        }, 
                      }}
                    >
                     <Typography sx={{ 
                       color: 'rgb(13, 13, 14)' }}>
        Dinle
      </Typography>
                    </Button>
                  )}
                  
                  {(type === 'oku' || type === 'favoriler' || type === 'gecmis') && (
                    <Button 
                      variant="contained" 
                      onClick={() => handleMasalAc(masal, 'oku')}
                      startIcon={<MenuBookIcon />}
                      sx={{ color: 'rgb(13, 13, 14)',
                        backgroundColor: 'rgb(186, 221, 201)',
                        borderRadius: '20px',
                        '&:hover': {
                          backgroundColor: 'rgb(140, 221, 175)'
                        }
                      }}
                    > <Typography sx={{ 
                      color: 'rgb(13, 13, 14)' }}></Typography>
                      Oku
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth={isFullScreen ? false : "lg"}
        fullWidth
        fullScreen={isFullScreen}
        PaperProps={{
          sx: {
            borderRadius: isFullScreen ? 0 : '15px',
            margin: isFullScreen ? 0 : 2,
            height: isFullScreen ? '100%' : 'auto'
          }
        }}
      >
        <DialogActions sx={{ justifyContent: 'flex-end', p: 1,backgroundColor: 'white' }}>
        <IconButton 
    onClick={toggleFullScreen}
    sx={{
      color: '#666', 
      '&:hover': {
        color: '#333' 
      }
    }}
  >
            {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
          <IconButton onClick={handleDialogClose}
           sx={{
            color: '#666', 
            '&:hover': {
              color: '#333' 
            }
          }}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
        
        <DialogContent sx={{ 
          p: 3,
          display: 'flex',
          flexDirection: isPlaying ? 'column' : 'row',
          gap: 3,
          height: isFullScreen ? 'calc(100vh - 48px)' : 'auto',
          alignItems: isPlaying ? 'center' : 'flex-start',
          maxHeight: isFullScreen ? '100vh' : '85vh',
          overflowY: 'auto'
        }}>
          {selectedMasal && (
            <>
              {isPlaying ? (
                <Box sx={{ 
                  width: '100%',
                  maxWidth: '800px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  py: 2,
          margin: '0 auto'
                }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontFamily: 'Comic Sans MS',
                      color: 'coral',
                      textAlign: 'center'
                    }}
                  >
                    {selectedMasal.baslik}
                  </Typography>

                  <Box
                    component="img"
                    src={selectedMasal.resimler[dialogImageIndex]}
                    alt={selectedMasal.baslik}
                    sx={{
                      width: '100%',
                      maxHeight: isFullScreen ? '40vh' : '300px',
                      objectFit: 'contain',
                      borderRadius: '10px'
                    }}
                  />

                  <Box sx={{ 
                    width: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)', 
                    p: 2, 
                    borderRadius: '10px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    <audio
                      controls
                      autoPlay
                      style={{ width: '100%' }}
                      src={selectedMasal.audioUrl}
                    >
                
                    </audio>
                  </Box>
                </Box>
              ) : (
                <>
                  <Box sx={{ 
                    flex: '0 0 45%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        mb: 2,
                        fontFamily: 'Comic Sans MS',
                        color: 'coral',
                        textAlign: 'center'
                      }}
                    >
                      {selectedMasal.baslik}
                    </Typography>

                    <Box
                      component="img"
                      src={selectedMasal.resimler[dialogImageIndex]}
                      alt={selectedMasal.baslik}
                      sx={{
                        width: '100%',
                        height: isFullScreen ? 'calc(100vh - 200px)' : '400px',
                        objectFit: 'contain',
                        borderRadius: '10px'
                      }}
                    />
                  </Box>

                  <Box sx={{ 
                    flex: '1',
                    backgroundColor: '#f5f5f5', 
                    p: 3, 
                    borderRadius: '10px',
                    overflowY: 'auto',
                    height: isFullScreen ? 'calc(100vh - 200px)' : '500px'
                  }}>
                    <Typography 
                      sx={{ 
                        fontFamily: 'Comic Sans MS',
                        fontSize: '16px',
                        lineHeight: 1.8,
                        textAlign: 'left',
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      {masalMetni}
                    </Typography>
                  </Box>
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};


export default MasalList;