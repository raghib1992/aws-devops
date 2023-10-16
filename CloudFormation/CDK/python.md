# Creating python virtual env in window
1) Install virtualenv using
pip install virtualenv

2) Now in which ever directory you are, this line below will create a virtualenv there
```bash
cd my-project

virtualenv --python C:\Users\raghi\AppData\Local\Programs\Python\Python31\python.exe venv
```

3) need to activate it
```sh
.\venv\Scripts\activate
```

4) creates a file called requirements.txt that enumerates the installed packages
```sh
pip freeze > requirements.txt
```

5) Install all dependencies
```sh
pip install -r requirements.txt
```

6) Deactivate the Environment
```sh
deactivate
```