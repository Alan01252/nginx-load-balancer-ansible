# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

 config.vm.box = "puppetlabs/ubuntu-14.04-64-nocm"

	  (1..2).each do |i|
		  config.vm.define "node-app-server-#{i}" do |web|
		    web.vm.hostname = "node-app-server-#{i}"
		    web.vm.network :private_network, ip: "192.168.100.10#{i}"
		end
	  end


	  config.vm.define "loadbalancer" do |web|
            # Configure load balancer
	    web.vm.network :private_network, ip: "192.168.100.100"
	    web.vm.provision "ansible_local" do |ansible|
			ansible.verbose = "v"
			ansible.playbook = "loadbalancer.yml"
			ansible.inventory_path = "vagrant-hosts"
			ansible.limit = "loadbalancer"
	   	 end
	    web.vm.provision "shell", inline: "nc 192.168.100.100 80 &> /dev/null; if [ $? -eq 0 ]; then echo 'Web Server Up'; else echo 'Web Server Down'; fi"

	    ## Configure app servers
	    web.vm.provision "ansible_local" do |ansible|
				ansible.verbose = "v"
				ansible.playbook = "node-setup.yml"
				ansible.limit = "application-servers"
				ansible.inventory_path = "vagrant-hosts"
		 end
	    web.vm.provision "ansible_local" do |ansible|
				ansible.verbose = "v"
				ansible.playbook = "node-app.yml"
				ansible.limit = "application-servers"
				ansible.inventory_path = "vagrant-hosts"
				ansible.extra_vars = {
					current_user: ENV['USER']
				}
		 end

	    web.vm.provision "shell", inline: "echo Making three requests to the loadbalancer on 192.168.100.100"
	    web.vm.provision "shell", inline: "for i in {1..3}; do curl -sS http://192.168.100.100; done"
	  end

end
