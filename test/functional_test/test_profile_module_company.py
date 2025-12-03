import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains


class TestProfileModuleCompany():
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

    def test_edit_description_company(self):
        # Navegar a la página principal
        self.driver.get("http://localhost:5173/")
        self.driver.set_window_size(1382, 744)

        # Iniciar sesión
        self.driver.find_element(
            By.LINK_TEXT, "Iniciar sesión como empresa").click()
        email_input = self.driver.find_element(By.XPATH, "//input[@id=':r1:']")
        password_input = self.driver.find_element(
            By.XPATH, "//input[@id=':r3:']")

        email_input.send_keys("p@gmail.com")
        password_input.send_keys("prueba0")
        self.driver.find_element(
            By.XPATH, "//div[@id='root']/div/div[2]/div/div/form/button").click()

        # Esperar la confirmación de inicio de sesión exitoso
        WebDriverWait(self.driver, 10).until(
            EC.text_to_be_present_in_element(
                (By.XPATH, "//div[@id='root']/div/div/div/div/div[2]/p"), "Inicio de sesión exitoso")
        )

        # Ir a la sección de editar descripción
        self.driver.find_element(
            By.CSS_SELECTOR, ".MuiPaper-root:nth-child(2) path").click()

        # Editar la descripción usando Ctrl+A y Backspace
        descripcion_input = self.driver.find_element(
            By.XPATH, "//textarea[@name='description']")
        descripcion_input.click()
        descripcion_input.send_keys(Keys.CONTROL + "a")
        descripcion_input.send_keys(Keys.BACKSPACE)
        descripcion_input.send_keys("Tech Descripcion New")

        # Hacer clic en el botón de submit para guardar los cambios
        self.driver.find_element(By.XPATH, "//button[@type='submit']").click()

        # Esperar a que el mensaje de confirmación de actualización aparezca
        WebDriverWait(self.driver, 10).until(
            EC.text_to_be_present_in_element(
                (By.XPATH, "//div[@id='root']/div/div/div"), "La información se actualizó con éxito")
        )

        # Verificar el mensaje final
        mensaje_actualizado = self.driver.find_element(
            By.XPATH, "//div[@id='root']/div/div/div").text
        print(f"Texto encontrado: '{mensaje_actualizado}'")
        assert mensaje_actualizado == "La información se actualizó con éxito"

    def test_info_contact_company(self):
        # Navegar a la página principal
        self.driver.get("http://localhost:5173/")
        self.driver.set_window_size(1382, 744)

        # Iniciar sesión
        self.driver.find_element(
            By.LINK_TEXT, "Iniciar sesión como empresa").click()

        # Introducir correo y contraseña con ActionChains
        email_input = self.driver.find_element(By.XPATH, "//input[@id=':r1:']")
        password_input = self.driver.find_element(
            By.XPATH, "//input[@id=':r3:']")

        actions = ActionChains(self.driver)
        actions.click(email_input).send_keys("p@gmail.com")  # Email
        actions.click(password_input).send_keys("prueba0")  # Contraseña
        actions.perform()

        # Hacer clic en el botón de submit
        self.driver.find_element(By.XPATH, "//button[@type='submit']").click()

        # Esperar a que el mensaje de inicio de sesión exitoso aparezca
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located(
                (By.XPATH, "//div[@id='root']/div/div/div/div/div[2]/p"))
        )
        assert self.driver.find_element(
            By.XPATH, "//div[@id='root']/div/div/div/div/div[2]/p").text == "Inicio de sesión exitoso"

        # Ir a la sección de editar contacto
        self.driver.find_element(
            By.CSS_SELECTOR, ".MuiPaper-root:nth-child(3) path").click()

        # Editar el teléfono usando Ctrl+A y Backspace
        phone_input = self.driver.find_element(By.XPATH, "//input[@id=':rf:']")
        phone_input.click()
        phone_input.send_keys(Keys.CONTROL + "a")  # Seleccionar todo el texto
        # Borrar el texto seleccionado
        phone_input.send_keys(Keys.BACKSPACE)
        phone_input.send_keys("987456321")          # Escribir el nuevo valor

        # Editar el correo usando la misma técnica
        email_input = self.driver.find_element(By.XPATH, "//input[@id=':rh:']")
        email_input.click()
        email_input.send_keys(Keys.CONTROL + "a")   # Seleccionar todo el texto
        # Borrar el texto seleccionado
        email_input.send_keys(Keys.BACKSPACE)
        email_input.send_keys("empresa1.com")       # Escribir el nuevo valor

        # Hacer clic en el botón de submit para guardar los cambios
        self.driver.find_element(By.XPATH, "//button[@type='submit']").click()

        WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located(
                (By.XPATH, "//div[@id='root']/div/div/div/div/div[2]/p"))
        )
        mensaje_actualizado = self.driver.find_element(
            By.XPATH, "//div[@id='root']/div/div/div/div/div[2]/p").text
        print(f"Texto encontrado: '{mensaje_actualizado}'")
        assert mensaje_actualizado == "La información se actualizó con éxito"

    def test_edit_personal_info_company(self):
        # Navegar a la página principal
        self.driver.get("http://localhost:5173/")
        self.driver.set_window_size(1382, 744)

        # Iniciar sesión
        self.driver.find_element(
            By.LINK_TEXT, "Iniciar sesión como empresa").click()
        email_input = self.driver.find_element(By.XPATH, "//input[@id=':r1:']")
        password_input = self.driver.find_element(
            By.XPATH, "//input[@id=':r3:']")

        email_input.send_keys("p@gmail.com")
        password_input.send_keys("prueba0")
        self.driver.find_element(
            By.XPATH, "//div[@id='root']/div/div[2]/div/div/form/button").click()

        # Esperar la confirmación de inicio de sesión exitoso
        WebDriverWait(self.driver, 10).until(
            EC.text_to_be_present_in_element(
                (By.XPATH, "//div[@id='root']/div/div/div/div/div[2]/p"), "Inicio de sesión exitoso")
        )

        # Ir a la sección de editar contacto
        self.driver.find_element(
            By.CSS_SELECTOR, ".css-1su4hq2 .MuiSvgIcon-root").click()

        # Editar campos usando la técnica Ctrl+A y Backspace
        campos = {
            "//input[@id=':rf:']": "NuevaENuevaE",
            "//input[@id=':rh:']": "Tech NTech 1",
            "//input[@id=':rj:']": "Lima",
            "//input[@id=':rl:']": "123456789123456722"
        }

        for xpath, valor in campos.items():
            campo = self.driver.find_element(By.XPATH, xpath)
            campo.click()
            campo.send_keys(Keys.CONTROL + "a")
            campo.send_keys(Keys.BACKSPACE)
            campo.send_keys(valor)

        # Hacer clic en el botón de submit para guardar los cambios
        self.driver.find_element(By.XPATH, "//button[@type='submit']").click()

        # Esperar a que el mensaje de confirmación de actualización aparezca
        WebDriverWait(self.driver, 10).until(
            EC.text_to_be_present_in_element(
                (By.XPATH, "//div[@id='root']/div/div/div"), "La información se actualizó con éxito")
        )

        # Verificar el mensaje final
        mensaje_actualizado = self.driver.find_element(
            By.XPATH, "//div[@id='root']/div/div/div").text
        print(f"Texto encontrado: '{mensaje_actualizado}'")
        assert mensaje_actualizado == "La información se actualizó con éxito"
