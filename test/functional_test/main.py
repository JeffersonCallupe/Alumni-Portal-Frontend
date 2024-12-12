from test_employability_module_user import TestEmployabilityModuleUser
from test_employability_module_company import TestEmployabilityModuleCompany
from test_activity_module_user import TestActivityModuleUser
from test_activity_module_company import TestActivityModuleCompany
from test_profile_module_company import TestProfileModuleCompany
from test_access_module_user import TestAccessModuleUser
from test_access_module_company import TestAccessModuleCompany
from test_profile_module_institucional import TestEditarInformacionPersonalInstitucional
import pytest
import sys
import os

# Ensure the current directory is in the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import all test modules
# from test_profile_module_user import TestProfileModuleUser


class TestMainWorkflow:
    def test_sequential_workflow(self):
        """
        Run all test classes sequentially and ensure comprehensive testing
        """
        # List of test classes to run
        test_classes = [
            TestAccessModuleCompany,
            TestAccessModuleUser,
            TestProfileModuleCompany,
            TestEditarInformacionPersonalInstitucional,  # Commented out as previously noted
            TestActivityModuleCompany,
            TestActivityModuleUser,
            TestEmployabilityModuleCompany,
            TestEmployabilityModuleUser
        ]

        # Run each test class
        for test_class in test_classes:
            pytest.main(
                ["-v", f"{test_class.__module__}::{test_class.__name__}"])


def main():
    """
    Main entry point for test execution
    """
    pytest.main(["-v", "main_test.py"])


if __name__ == "__main__":
    main()
