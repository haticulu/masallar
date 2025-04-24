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

// Kategoriler
const kategoriler = [
  'Klasik Çocuk Masalları',
  'Eğitici Masallar',
  'Hayvan Masalları',
  'Keloğlan Masalları',
  'Fantastik Masallar'
];

// Masallar verisi
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
    sure: "5 dakika",
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
  sure: "6 dakika",
  audioUrl: "/audio/bremen-mizikacilari.mp3",
  kategori: "Hayvan Masalları",
  textUrl: "/texts/bremen-mizikacilari.txt"
},
{
  id: 3,
  baslik: "Uyuyan Güzel",
  resimler: [
    "/images/masallar/uyuyan-guzel-1.jpg",
    "/images/masallar/uyuyan-guzel-2.jpg",
    "/images/masallar/uyuyan-guzel-3.jpg",
    "/images/masallar/uyuyan-guzel-4.jpg",
    "/images/masallar/uyuyan-guzel-5.jpg"
  ],
  sure: "7 dakika",
  audioUrl: "/audio/uyuyan-guzel.mp3",
  kategori: "Klasik Çocuk Masalları",
  textUrl: "/texts/uyuyan-guzel.txt"
},
{
  id: 4,
  baslik: "Pijamalı Korsanlar",
  resimler: [
    "/images/masallar/pijamali-korsanlar-1.jpg",
    "/images/masallar/pijamali-korsanlar-2.jpg",
    "/images/masallar/pijamali-korsanlar-3.jpg",
    "/images/masallar/pijamali-korsanlar-4.jpg",
    "/images/masallar/pijamali-korsanlar-5.jpg"
  ],
  sure: "6 dakika",
  audioUrl: "/audio/pijamali-korsanlar.mp3",
  kategori: "Fantastik Masallar",
  textUrl: "/texts/pijamali-korsanlar.txt"
},
{
  id: 5,
  baslik: "Keloğlan Masalları",
  resimler: [
    "/images/masallar/kel-1.jpg",
    "/images/masallar/kel-2.jpg",
    "/images/masallar/kel-3.jpg",
    "/images/masallar/kel-4.jpg",
    "/images/masallar/kel-5.jpg"
  ],
  sure: "6 dakika",
  audioUrl: "/audio/keloglan.mp3",
  kategori: "Keloğlan Masalları",
  textUrl: "/texts/keloglan.txt"
}



];
const MasalList = ({ type = 'dinle',darkMode }) => {

  // State tanımlamaları
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

  // Local Storage state'leri
  const [favoriler, setFavoriler] = useState([]);
  const [listenHistory, setListenHistory] = useState(() => {
    const savedHistory = localStorage.getItem(`history_${currentUser?.id}`);
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

    // Favorileri yükle ve kontrol et
useEffect(() => {
  if (currentUser) {
    // Yeni kullanıcı için boş favori listesi oluştur
    const userFavorites = localStorage.getItem(`favoriler_${currentUser.id}`);
    if (!userFavorites) {
      localStorage.setItem(`favoriler_${currentUser.id}`, JSON.stringify([]));
    }
    setFavoriler(userFavorites ? JSON.parse(userFavorites) : []);
  } else {
    setFavoriler([]);
  }
}, [currentUser]);

// Dinleme geçmişi için
useEffect(() => {
  if (currentUser) {
    // Yeni kullanıcı için boş geçmiş listesi oluştur
    const savedHistory = localStorage.getItem(`history_${currentUser.id}`);
    if (!savedHistory) {
      localStorage.setItem(`history_${currentUser.id}`, JSON.stringify([]));
    }
    setListenHistory(savedHistory ? JSON.parse(savedHistory) : []);
  } else {
    setListenHistory([]);
  }
}, [currentUser]);

  // Resim geçişi için useEffect
  useEffect(() => {
    let timer;
    if (openDialog && selectedMasal) {
      timer = setInterval(() => {
        setDialogImageIndex((prev) => (prev + 1) % selectedMasal.resimler.length);
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [openDialog, selectedMasal]);

   // Event Handlers
   const handleFavori = (masalId, event) => {
    event.stopPropagation();
    if (!currentUser) {
      navigate('/giris');
      return;
    }
    const yeniFavoriler = favoriler.includes(masalId)
      ? favoriler.filter(id => id !== masalId)
      : [...favoriler, masalId];
    
    setFavoriler(yeniFavoriler);
    localStorage.setItem(`favoriler_${currentUser.id}`, JSON.stringify(yeniFavoriler));
  };

  const addToHistory = (masal) => {
    if (!currentUser) return;

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
        addToHistory(masal, 'oku');
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

  // Ana sayfa için resim yolu düzeltmesi
  
  return (
    <Container sx={{ py: 4, paddingTop: '20px',
    backgroundColor: darkMode ? 'rgb(14, 9, 73)' : 'rgb(241, 239, 100)', // Yumuşak turuncu-krem tonu
      minHeight: '100vh'
     }}>
    <Typography 
      variant="h4" 
      align="center" 
      sx={{ 
        mb: 4, 
        color: 'coral',
        fontFamily: 'Comic Sans MS',
        textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
      }}
    >{type === 'favoriler' ? 'FAVORİ MASALLARIM' : 
      type === 'gecmis' ? 'DİNLEME GEÇMİŞİM' :
      type === 'oku' ? 'MASAL OKU' : 'MASAL DİNLE'}
   </Typography>
   <Box sx={{ 
  display: 'flex', 
  gap: 2, 
  mb: 4,
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%'
}}>
  {/* Kategori Seçimi */}
  <FormControl sx={{ 
    width: '150px',
    '& .MuiInputBase-root': {
      borderRadius: '20px',
      height: '40px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      '&:hover': {
        boxShadow: '0 4px 6px rgba(0,0,0,0.15)'
      }
    },
    '& .MuiSelect-select': {
      fontSize: '14px',
      color: '#666',
      textAlign: 'center',
      fontFamily: 'Comic Sans MS',
    },
    '& .MuiInputLabel-root': {
      fontSize: '14px',
      color: '#888',
      fontFamily: 'Comic Sans MS'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'gray'
    }
  }}>
    <InputLabel>Kategori </InputLabel>
    <Select
      value={kategori}
      label="Kategori"
      onChange={(e) => setKategori(e.target.value)}
    >
      <MenuItem value="" sx={{ 
        fontSize: '14px',
        fontFamily: 'Comic Sans MS'
      }}>
        Tümü
      </MenuItem>
      {kategoriler.map(kat => (
        <MenuItem 
          key={kat} 
          value={kat}
          sx={{ 
            fontSize: '14px',
            fontFamily: 'Comic Sans MS',
          }}
        >
          {kat}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  {/* Arama Kutusu */}
  <TextField
    placeholder="Masal Ara..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    InputProps={{
      startAdornment: <SearchIcon sx={{ color: '#888', mr: 1, fontSize: '20px' }} />,
    }}
    sx={{ 
      width: '150px',
      '& .MuiInputBase-root': {
        borderRadius: '20px',
        height: '40px',
        backgroundColor: '#fff',
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
      <Grid container spacing={4}>
        {filteredMasallar.map((masal) => (
          <Grid item key={masal.id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                backgroundColor: darkMode ? 'rgb(250, 250, 250)' : 'rgba(245, 232, 176, 0.93)', 
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
                    Son dinleme: {
                      new Date(listenHistory.find(h => h.id === masal.id)?.tarih).toLocaleDateString('tr-TR')
                    }
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
      color: '#666', // Sabit gri renk
      '&:hover': {
        color: '#333' // Hover durumunda koyu gri
      }
    }}
  >
            {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
          <IconButton onClick={handleDialogClose}
           sx={{
            color: '#666', // Sabit gri renk
            '&:hover': {
              color: '#333' // Hover durumunda koyu gri
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
                      Tarayıcınız audio elementini desteklemiyor.
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