# How to launch GUI APPs on WSL

## On Windows
- Install **VcXsrv Windows X Server**
  - https://sourceforge.net/projects/vcxsrv/
- When open XServer select 'Disable Access Control'
- Allow firewall for public and private networks
  
## On Linux 
- `echo "export DISPLAY=localhost:0.0" >> ~/.bashrc`
- `source ~'/bashrc`
### Testing
- `sudo apt-get install x11-apps`
- `xcalc`
- It should open calculator app GUI through XServer in Windows