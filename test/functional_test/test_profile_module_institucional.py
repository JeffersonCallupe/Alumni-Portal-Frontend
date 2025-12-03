import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options

class TestEditarInformacionPersonalInstitucional:
    def setup_method(self, method):
        # Crear objeto de opciones de Chrome
        options = Options()
        options.add_argument("--disable-gpu")
        options.add_argument("--headless")
        # Inicializar el driver con las opciones configuradas
        self.driver = webdriver.Chrome(options=options)
        self.vars = {}

    def teardown_method(self, method):
        self.driver.quit()

    def test_agregar_experiencia_laboral(self):
        # Navegar a la página principal
        self.driver.get("http://localhost:5173/")
        self.driver.set_window_size(1050, 708)

         # Iniciar sesión
        email_input = self.driver.find_element(By.XPATH, "//input[@id=':r1:']")
        password_input = self.driver.find_element(By.XPATH, "//input[@id=':r3:']")
        email_input.send_keys("luis.balarezo@unmsm.edu.pe")
        password_input.send_keys("root")
       
        # Hacer clic en el botón de submit
        self.driver.find_element(By.XPATH, "//button[@type='submit']").click()

        # Confirmar inicio de sesión exitoso
        WebDriverWait(self.driver, 10).until(
            EC.text_to_be_present_in_element((By.XPATH, "//div[@id='root']/div/div/div/div/div[2]/p"), "Inicio de sesión exitoso")
        )
        
    
        # Ir a la sección de edición de perfil institucional
        self.driver.find_element(By.CSS_SELECTOR, ".css-1su4hq2 path").click()

        # Editar campos usando Ctrl+A y Backspace
        campos = {
            "name": "LUIS JESUS",
            "paternalSurname": "BALAREZO 1",
            "maternalSurname": "RAMOS 1",
            "headline": "Software Engineer 1",
            "contactNumber": "987654322"
        }

        for field_name, value in campos.items():
            campo = self.driver.find_element(By.NAME, field_name)
            campo.click()
            campo.send_keys(Keys.CONTROL + "a")  # Seleccionar todo el texto
            campo.send_keys(Keys.BACKSPACE)  # Borrar el texto
            campo.send_keys(value)  # Escribir el nuevo valor


         # Guardar los cambios
        self.driver.find_element(By.XPATH, "//button[@type='submit']").click()


        # Esperar a que el mensaje de confirmación de actualización aparezca
        WebDriverWait(self.driver, 15).until(
            EC.text_to_be_present_in_element((By.XPATH, "//div[@id='root']/div/div/div/div/div[2]/p"), "La información se actualizó con éxito")
        )
     
     
        # ACERCA DE 
        
         # Ir a la sección de editar descripción
        self.driver.find_element(By.CSS_SELECTOR, ".w-full > .MuiPaper-root:nth-child(2) path").click()
        
        # Editar la descripción usando Ctrl+A y Backspace
        descripcion_about = self.driver.find_element(By.NAME, "about")
        descripcion_about.click()
        descripcion_about.send_keys(Keys.CONTROL + "a")
        descripcion_about.send_keys(Keys.BACKSPACE)
        descripcion_about.send_keys("""Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime doloremque, ratione nostrum, 
            exercitationem deleniti cupiditate sit necessitatibus odit voluptas facere odio cumque ut dolore 
            distinctio sequi dolorem magnam dolorum! At! Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
            Maxime doloremque, ratione nostrum, exercitationem deleniti cupiditate sit necessitatibus odit voluptas 
            facere odio cumque ut dolore distinctio sequi dolorem magnam dolorum!11111111111112""")
        
        # Hacer clic en el botón de submit para guardar los cambios
        self.driver.find_element(By.XPATH, "//button[@type='submit']").click()
        
        
         # Esperar a que el mensaje de confirmación de actualización aparezca
        WebDriverWait(self.driver, 15).until(
            EC.text_to_be_present_in_element((By.XPATH, "//div[@id='root']/div/div/div/div/div[2]/p"), "La información se actualizó con éxito")
        )
     