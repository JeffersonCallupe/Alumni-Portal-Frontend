import pytest
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.chrome.options import Options


class TestAccessModuleCompany():
    def setup_method(self, method):
        # Crear objeto de opciones de Chrome
        options = Options()
        # Desactivar GPU
        options.add_argument("--disable-gpu")
        # Ejecutar en modo headless (sin interfaz gráfica)
        options.add_argument("--headless")
        # Inicializar el driver con las opciones configuradas
        self.driver = webdriver.Chrome(options=options)
        self.vars = {}

    def teardown_method(self, method):
        self.driver.quit()

    def test_company_login_wrong_credentials(self):
        # Navegar a la página principal
        self.driver.get("http://localhost:5173/")

        # Iniciar sesión
        self.driver.find_element(
            By.LINK_TEXT, "Iniciar sesión como empresa").click()
        self.driver.find_element(By.ID, ":r1:").send_keys(
            "empresa2@pruebas.com")
        self.driver.find_element(By.ID, ":r3:").send_keys("00000000")
        self.driver.find_element(
            By.CSS_SELECTOR, ".MuiButtonBase-root").click()

        # Esperar la confirmación de inicio de sesión exitoso
        WebDriverWait(self.driver, 10).until(
            EC.text_to_be_present_in_element(
                (By.XPATH, "//div[@id='root']/div/div/div/div/div[2]/p"), "Error al iniciar sesión")
        )

    def test_company_login_success(self):
        # Navegar a la página principal
        self.driver.get("http://localhost:5173/")

        # Iniciar sesión
        self.driver.find_element(
            By.LINK_TEXT, "Iniciar sesión como empresa").click()
        self.driver.find_element(By.ID, ":r1:").send_keys(
            "empresa@pruebas.com")
        self.driver.find_element(By.ID, ":r3:").send_keys("1234567890")
        self.driver.find_element(
            By.CSS_SELECTOR, ".MuiButtonBase-root").click()

        # Esperar el mensaje de error
        WebDriverWait(self.driver, 10).until(
            EC.text_to_be_present_in_element(
                (By.XPATH, "//div[@id='root']/div/div/div/div/div[2]/p"), "Inicio de sesión exitoso")
        )
