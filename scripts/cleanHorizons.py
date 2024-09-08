import os
import csv

def process(in_folder, out_folder):
    if not os.path.exists(out_folder):
        os.makedirs(out_folder)
    
    for name in os.listdir(in_folder):
        if name.endswith('.txt'):
            in_path = os.path.join(in_folder, name)
            out_path = os.path.join(out_folder, name[:-4] + '.csv')
            
            with open(in_path, 'r') as txtfile, open(out_path, 'w', newline='') as csvfile:
                writer = csv.writer(csvfile)
                lines = txtfile.readlines()
                writer.writerow(['jdtdb', 'calendar', 'x', 'y', 'z', 'lt', 'rg', 'rr']) 
                
                processing = False
                for line in lines:
                    line = line.strip()
                    if line.startswith('$$SOE'):
                        processing = True
                        continue
                    elif line.startswith('$$EOE'):
                        break
                    
                    if processing:
                        writer.writerow([item.strip() for item in line.strip(',\n').split(', ')])

# Usage
input_folder = "./horizons-raw"
output_folder = "../src/lib/data/horizons"
process(input_folder, output_folder)