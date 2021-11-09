import subprocess

if "SchoolWifiName" in subprocess.check_output("netsh wlan show interfaces"):
    print "I am on school wifi!"