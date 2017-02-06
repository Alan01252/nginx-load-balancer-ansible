# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

 config.vm.box = "puppetlabs/ubuntu-14.04-64-nocm"

	  config.vm.define "web1" do |web|
	    web.vm.network :private_network, ip: "192.168.100.100"
	    web.vm.provision "ansible_local" do |ansible|
			ansible.verbose = "v"
			ansible.playbook = "setup.yml"
	   	 end
	    web.vm.provision "shell", inline: "nc 192.168.100.100 80 &> /dev/null; if [ $? -eq 0 ]; then echo 'Web Server Up'; else echo 'Web Server Down'; fi"
	    web.vm.provision "ansible_local" do |ansible|
			ansible.verbose = "v"
			ansible.playbook = "node.yml"
	   	 end
	    web.vm.provision "shell", inline: "curl -sS http://192.168.100.100"
	  end

	  config.vm.define "web2" do |web|
	    web.vm.network :private_network, ip: "192.168.100.101"
	    web.vm.provision "ansible_local" do |ansible|
			ansible.verbose = "v"
			ansible.playbook = "setup.yml"
	   	 end
	    web.vm.provision "shell", inline: "nc 192.168.100.101 80 &> /dev/null; if [ $? -eq 0 ]; then echo 'Web Server Up'; else echo 'Web Server Down'; fi"
	    web.vm.provision "ansible_local" do |ansible|
			ansible.verbose = "v"
			ansible.playbook = "node.yml"
	   	 end
	    web.vm.provision "shell", inline: "curl -sS http://192.168.100.101"
	  end

	  config.vm.define "web3" do |web|
	    web.vm.network :private_network, ip: "192.168.100.102"
	    web.vm.provision "ansible_local" do |ansible|
			ansible.verbose = "v"
			ansible.playbook = "setup.yml"
	   	 end
	    web.vm.provision "shell", inline: "nc 192.168.100.102 80 &> /dev/null; if [ $? -eq 0 ]; then echo 'Web Server Up'; else echo 'Web Server Down'; fi"
	    web.vm.provision "ansible_local" do |ansible|
			ansible.verbose = "v"
			ansible.playbook = "node.yml"
	   	 end
	    web.vm.provision "shell", inline: "curl -sS http://192.168.100.102"
	  end


end
