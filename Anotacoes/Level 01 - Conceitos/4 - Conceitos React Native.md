# Conceitos React Native

## O que é React Native?

- Versão do React para desenvolvimento mobile
- Multiplataforma (Android e IOS)
- Podemos manipular cada plataforma de forma diferente (Cada plataforma agir de uma forma)
- Interface nativa ou hibrida?
  - Diferente do Ionic que gera um webview e transforma em aplicativo, perdendo performance e fazendo uso de interface hibrida o React faz uso de interface nativa, ou seja, comunica-se direto com a API do Android e IOS (interface nativa)
- React Native injeta uma dependencia chamada 'Javascript core' que permite que o celular entenda JS nativamente
- Portanto o código não é transpilado
- Empresas estão migrando suas aplicações para React Native
  - Microsoft está fazendo uso de React Native em algumas aplicações mobile

## Arquitetura

- O código é escrito em JS com JSX
- Após este código passa por uma ferramenta chamada 'Metro Bundler' (Packager) que gerará um "bundle.js", comparando à web, podemos dizer que seria o webpack do mobile
- Este bundle passa por uma 'bridge' que é a ponte de comunicação entre o JS e o código nativo
- Após isto, o que for necessário, é transformado em código nativo (Java e Objective-C)
<img src="Assets/arq-react-native.png">

## Sintaxe

- Declaração dos componentes (functions e classes) são iguais ao HTML
- Não utilizamos HTML (como na web permitia), necessitamos fazer uso de componentes do próprio React ou criar os nossos próprios
- Aplicamos estilo sem classes ou ID's
- Todo o texto é com o componente `<Text />` e este não possui estilização própria, ou seja, sempre que criado requer uma estilização
- Nenhum elemento tem estilo
- As StyleSheet são criadas dentro do JS, porém mantém uma semelhança de sintaxe com CSS, mudando principalmente o uso de hífen para camelCase 
  - Ex: `background-color: 'blue'` => `backgroundColor: 'blue'` 
     
   <img src="Assets/rn-example.png">

## Expo

- SDK com conjunto de funcionalidades prontas para utilizar (integrações, câmera, video, etc.)
- Não necessita emulador (contém aplicativo que facilita o desenvolvimento)

### Não vamos utilizar o Expo

- Caso necessário interagir e programar diretamente com código nativo, o Expo não permite
- Várias bibliotecas não tem suporte para o Expo
- O Expo liberou seu conjunto de ferramentas prontas para serem utilizadas com projetos que não utilizam Expo

## Configurando o Ambiente de Desenvolvimento (SDK)

- Vamos precisar instalar o SDK do Android e o XCode (só no MAC) para desenvolver para IOS
### Para IOS
- https://react-native.rocketseat.dev/ios/macos
### Para Android
- https://react-native.rocketseat.dev/android/linux/
- Instalando Java
  - ```bash
    sudo add-apt-repository ppa:openjdk-r/ppa
    sudo apt-get update
    sudo apt-get install openjdk-8-jdk
    
    #Testing - Need to be Java 8
    java -version
    #>>> openjdk version "1.8.0_252"
    ```
- Instalando Libs gráficas para conseguir emular o projeto
  - ```bash
    sudo apt-get install gcc-multilib lib32z1 lib32stdc++6
    ```
- Preparando para instalar AndroidStudio
  - Criar um caminho para instalação do AndroidStudio
    - ```bash
      mkdir -p ~/Android/sdk
      ```
  - Buscar o caminho do JDK 8, normalmente está dentro de `/usr/lib/jvm/java-8-openjdk-amd64`
    - ```bash
      ls /usr/lib/jvm/java-8-openjdk-amd64/
      ```
  - Adicionar no arquivo `~/.bashrc`
    - ```bash
      export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/
      export ANDROID_HOME=~/Android/Sdk
      export PATH=$PATH:$ANDROID_HOME/emulator
      export PATH=$PATH:$ANDROID_HOME/tools
      export PATH=$PATH:$ANDROID_HOME/tools/bin
      export PATH=$PATH:$ANDROID_HOME/platform-tools
      ```
- Instalando AndroidStudio
  - Fazer download do Android Studio 
    - https://developer.android.com/studio/
  - Mover o arquivo compactado para `~/`
  - Extrair os arquivos
    - ```bash
      tar -xvzf android-studio-ide-193.6626763-linux.tar.gz
      ```
  - Adicionar ao `~/.bashrc`
    - ```bash
      export PATH=$PATH:~/android-studio/bin
      ```
    - Com isso conseguimos abrir o android studio executando apenas `studio.sh`
  - Executar `studio.sh`
  - Selecionar 'Do not import settings'
  - Aguardar carregar e na tela de Welcome clicar em 'Next'
  - Ao solicitar a localização do JDK escolher 'JAVA_HOME'
- Instalando a SDK 28 do Android (Pie)
  - Na Janela inicial do Android Studio clicar em 'Configure'
  - Clicar em 'SDK Manager'
  - Selecionar a SDK 28
  - Apply
  - Concordar e next
  - Aguardar Download
- Caso tenha suporte ao KVM (Informado durante a instalação do Android Studio)
  - ```bash
    sudo apt install qemu-kvm
    sudo adduser $USER kvm
    source ~/.bashrc

    #testando
    grep kvm /etc/group
    #Saida esperada
    #>>> kvm:x:NUMERO_QUALQUER:SEU_USUARIO
    ```
- Configurando Emulador
  - Na página inicial do AndroidStudio
  - Clicar em 'Configure'
  - Clicar em 'AVD Manager'
  - 'Create Virtual Device'
  - Selecionar um Device que possua Play Store
  - Configuar device

### Com WSL 

- No Windows
  - Instalar Android Studio
  - Configurar SDK
  - Configurar AVD
  - Configurar PATH até plataform-tools
    - Encontrar o caminho
      - `C:\Users\felip\AppData\Local\Android\Sdk\platform-tools"`
    - Adicionar ao PATH (Através do CMD)
      - ```
        setx PATH "%PATH%;C:\Users\felip\AppData\Local\Android\Sdk\platform-tools"
        ```
  - Executar
    - ```
      adb kill-server
      adb -a nodaemon server start
      ```
- No Linux
  - Deve estar habilitado o uso de aplicativos [GUI via WSL](https://github.com/FelippeChemello/GoStack/blob/master/Anotacoes/Use%20GUI%20in%20WSL.md)
  - Instalar o AndroidStudio (Como no tutorial Anterior)
  - Configurar SDK
- No Windows
  - Iniciar um Device via AVD
- No Linux
  - Ao Executar 
    ```
    adb devices
    ```
  - Deve exibir o Device conectado
