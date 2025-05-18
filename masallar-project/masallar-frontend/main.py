import pygame, sys
from Button import Button

pygame.init()

# Add music state variable
music_playing = True
pygame.mixer.music.load("assets/Music.mp3")
pygame.mixer.music.play(-1, 0.0)

SCREEN = pygame.display.set_mode((1920, 1080))
pygame.display.set_caption("Menu")

BG = pygame.image.load('assets/bg.jpeg')
MR = pygame.image.load("assets/kutucuklar/Menu Rect.png")
TH = pygame.image.load("assets/Türkiye H.png")
AP1 = pygame.image.load("assets/Arka Plan1.png")

pygame.display.toggle_fullscreen() 

def get_font(size): 
    return pygame.font.Font("assets/fonts/IMPACTED.ttf", size)

def title_font(size):
    return pygame.font.Font("assets/fonts/DUTCHEB.ttf", size)

def toggle_music():
    global music_playing
    if music_playing:
        pygame.mixer.music.pause()
    else:
        pygame.mixer.music.unpause()
    music_playing = not music_playing

def main_menu():
    while True:
        SCREEN.blit(BG, (0, 0))
        SCREEN.blit(MR, (220, 46)) 

        MENU_MOUSE_POS = pygame.mouse.get_pos()

        MENU_TEXT = title_font(75).render ("SOYU TÜKENMEKTE OLAN HAYVANLAR", True, "#d7fcd4")
        MENU_RECT = MENU_TEXT.get_rect(center=(1000, 102))

        PLAY_BUTTON = Button(image=pygame.image.load("assets/kutucuklar/Play Rect.png"), pos=(1000, 352), 
                            text_input="BAŞLA", font=title_font(75), base_color="#d7fcd4", hovering_color="White")
        OPTIONS_BUTTON = Button(image=pygame.image.load("assets/kutucuklar/Options Rect.png"), pos=(1000, 502), 
                            text_input="AYARLAR", font=title_font(75), base_color="#d7fcd4", hovering_color="White")
        QUIT_BUTTON = Button(image=pygame.image.load("assets/kutucuklar/Quit Rect.png"), pos=(1000, 652), 
                            text_input="ÇIKIŞ", font=title_font(75), base_color="#d7fcd4", hovering_color="White")
        
        # Add music toggle button with symbol
        MUSIC_BUTTON = Button(image=pygame.image.load("assets/kutucuklar/Kutucuk.png"), pos=(1800, 100), 
                            text_input="🔊" if music_playing else "🔇", 
                            font=get_font(40), base_color="#d7fcd4", hovering_color="White")

        SCREEN.blit(MENU_TEXT, MENU_RECT)

        for button in [PLAY_BUTTON, OPTIONS_BUTTON, QUIT_BUTTON, MUSIC_BUTTON]:
            button.changeColor(MENU_MOUSE_POS)
            button.update(SCREEN)
        
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.MOUSEBUTTONDOWN:
                if PLAY_BUTTON.checkForInput(MENU_MOUSE_POS):
                    play()
                if OPTIONS_BUTTON.checkForInput(MENU_MOUSE_POS):
                    options()
                if QUIT_BUTTON.checkForInput(MENU_MOUSE_POS):
                    pygame.quit()
                    sys.exit()
                if MUSIC_BUTTON.checkForInput(MENU_MOUSE_POS):
                    toggle_music()
                    MUSIC_BUTTON.text_input = "🔊" if music_playing else "🔇"

        pygame.display.update() 