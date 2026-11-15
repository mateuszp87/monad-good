from pathlib import Path
import subprocess,json,concurrent.futures
starts=[91.62,136.005,176.59,211.67,251.68,297.2,329.18,374.07,474.42,503.24,548.57,589.06,631.97,675.8,724.28,761.81,798.74,830.94]
import argparse
parser=argparse.ArgumentParser(description='Prepare silent, scroll-seekable hole segments from the source flyover.')
parser.add_argument('--source',type=Path,required=True)
parser.add_argument('--output',type=Path,default=Path('dist/assets/pinehurst'))
args=parser.parse_args()
root=args.output
root.mkdir(parents=True,exist_ok=True)
def build(i):
 start=starts[i]+1.7
 end=(423 if i==7 else 871.3 if i==17 else starts[i+1])-1.7
 span=end-start
 p=root/f'flight-{i+1:02d}.mp4'
 cmd=['ffmpeg','-hide_banner','-loglevel','error','-ss',str(start),'-t',str(span),'-i',str(args.source),'-an','-vf',f'setpts={8/span}*PTS,fps=24,scale=960:-2','-c:v','libx264','-threads','2','-preset','fast','-crf','28','-g','3','-keyint_min','3','-sc_threshold','0','-movflags','+faststart','-y',str(p)]
 subprocess.run(cmd,check=True)
 # A real first frame is also the startup/offline poster for each hole.
 subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-i',str(p),'-frames:v','1','-q:v','3','-y',str(root/f'flight-{i+1:02d}.jpg')],check=True)
 d=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration,size','-of','json',str(p)]))['format']
 print(f'Hole {i+1:02d}: {d["duration"]}s, {int(d["size"])/1024/1024:.1f} MiB',flush=True)
 return {'hole':i+1,'sourceStart':start,'sourceEnd':end,'duration':float(d['duration']),'bytes':int(d['size'])}
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool: rows=list(pool.map(build,range(18)))
(root/'flight-manifest.json').write_text(json.dumps(rows,indent=2)+'\n')
print('Total MiB:',round(sum(r['bytes'] for r in rows)/1024/1024,1),flush=True)
