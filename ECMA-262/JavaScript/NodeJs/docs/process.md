## http://api.nodejs.cn/
node官网支持搜索具体命令

## http://nodejs.cn/api-v16/process/process_argv.html

process.argv 属性返回数组，其中包含启动 Node.js 进程时传入的命令行参数。 第一个元素将是 process.execPath。 
如果需要访问 argv[0] 的原始值，请参阅 process.argv0。 第二个元素将是正在执行的 JavaScript 文件的路径。 其余元素将是任何其他命令行参数。

#
```js
  title: 'npm run new input',
  argv: [
    'D:\\Program\\nodejs\\node.exe',
    'D:\\element-ui\\component-library\\v5\\juejin-element-ui\\build\\bin\\new.js',
    'input'
  ],
```

## process
```javascript
 process {
  version: 'v16.13.2',
  versions: {
    node: '16.13.2',
    v8: '9.4.146.24-node.14',
    uv: '1.42.0',
    zlib: '1.2.11',
    brotli: '1.0.9',
    ares: '1.18.1',
    modules: '93',
    nghttp2: '1.45.1',
    napi: '8',
    llhttp: '6.0.4',
    openssl: '1.1.1l+quic',
    cldr: '39.0',
    icu: '69.1',
    tz: '2021a',
    unicode: '13.0',
    ngtcp2: '0.1.0-DEV',
    nghttp3: '0.1.0-DEV'
  },
  arch: 'x64',
  platform: 'win32',
  release: {
    name: 'node',
    lts: 'Gallium',
    sourceUrl: 'https://nodejs.org/download/release/v16.13.2/node-v16.13.2.tar.gz',
    headersUrl: 'https://nodejs.org/download/release/v16.13.2/node-v16.13.2-headers.tar.gz',
    libUrl: 'https://nodejs.org/download/release/v16.13.2/win-x64/node.lib'
  },
  _rawDebug: [Function: _rawDebug],
  moduleLoadList: [
    'Internal Binding native_module',
    'Internal Binding errors',
    'NativeModule internal/errors',
    'Internal Binding config',
    'Internal Binding constants',
    'Internal Binding util',
    'Internal Binding types',
    'NativeModule internal/util',
    'NativeModule internal/util/types',
    'NativeModule internal/assert',
    'NativeModule internal/validators',
    'Internal Binding icu',
    'NativeModule internal/util/inspect',
    'NativeModule events',
    'Internal Binding buffer',
    'Internal Binding string_decoder',
    'NativeModule internal/buffer',
    'Internal Binding blob',
    'NativeModule internal/encoding',
    'Internal Binding symbols',
    'Internal Binding messaging',
    'NativeModule internal/worker/js_transferable',
    'NativeModule internal/blob',
    'NativeModule buffer',
    'NativeModule internal/process/per_thread',
    'Internal Binding process_methods',
    'Internal Binding credentials',
    'Internal Binding async_wrap',
    'Internal Binding task_queue',
    'NativeModule internal/async_hooks',
    'NativeModule async_hooks',
    'NativeModule internal/process/promises',
    'NativeModule internal/fixed_queue',
    'NativeModule internal/process/task_queues',
    'Internal Binding trace_events',
    'NativeModule internal/constants',
    'NativeModule internal/console/constructor',
    'NativeModule internal/console/global',
    'NativeModule internal/util/inspector',
    'Internal Binding inspector',
    'NativeModule internal/querystring',
    'NativeModule path',
    'NativeModule querystring',
    'Internal Binding url',
    'NativeModule internal/url',
    'NativeModule internal/util/debuglog',
    'NativeModule util',
    'Internal Binding performance',
    'NativeModule internal/perf/utils',
    'NativeModule internal/event_target',
    'NativeModule internal/abort_controller',
    'Internal Binding worker',
    'NativeModule internal/streams/end-of-stream',
    'NativeModule internal/streams/destroy',
    'NativeModule internal/streams/legacy',
    'NativeModule internal/streams/add-abort-signal',
    'NativeModule internal/streams/buffer_list',
    'NativeModule internal/streams/state',
    'NativeModule string_decoder',
    'NativeModule internal/streams/from',
    'NativeModule internal/streams/readable',
    'NativeModule internal/streams/writable',
    'NativeModule internal/streams/duplex',
    'NativeModule internal/streams/utils',
    'NativeModule internal/streams/pipeline',
    'NativeModule internal/streams/compose',
    'NativeModule stream/promises',
    'NativeModule internal/streams/transform',
    'NativeModule internal/streams/passthrough',
    'NativeModule stream',
    'NativeModule internal/worker/io',
    'Internal Binding timers',
    'NativeModule internal/linkedlist',
    'NativeModule internal/priority_queue',
    'NativeModule internal/timers',
    'NativeModule timers',
    'NativeModule internal/perf/performance_entry',
    'NativeModule internal/perf/observe',
    'NativeModule internal/perf/nodetiming',
    'NativeModule internal/perf/usertiming',
    'NativeModule internal/perf/event_loop_utilization',
    'NativeModule internal/histogram',
    'NativeModule internal/perf/timerify',
    'NativeModule internal/perf/performance',
    'NativeModule internal/perf/event_loop_delay',
    'NativeModule perf_hooks',
    'NativeModule internal/process/execution',
    'NativeModule internal/process/warning',
    'Internal Binding fs',
    'NativeModule internal/fs/utils',
    'Internal Binding fs_dir',
    'NativeModule internal/fs/dir',
    'Internal Binding fs_event_wrap',
    'Internal Binding uv',
    'NativeModule internal/fs/watchers',
    'NativeModule internal/fs/read_file_context',
    'NativeModule fs',
    'Internal Binding serdes',
    'Internal Binding profiler',
    'Internal Binding heap_utils',
    ... 48 more items
  ],
  binding: [Function: binding],
  _linkedBinding: [Function: _linkedBinding],
  _events: [Object: null prototype] {
    newListener: [Function: startListeningIfSignal],
    removeListener: [Function: stopListeningIfSignal],
    warning: [Function: onWarning],
    exit: [Function (anonymous)],
    SIGWINCH: [Function (anonymous)]
  },
  _eventsCount: 5,
  _maxListeners: undefined,
  domain: null,
  _exiting: false,
  config: [Getter/Setter],
  dlopen: [Function: dlopen],
  uptime: [Function: uptime],
  _getActiveRequests: [Function: _getActiveRequests],
  _getActiveHandles: [Function: _getActiveHandles],
  reallyExit: [Function: reallyExit],
  _kill: [Function: _kill],
  cpuUsage: [Function: cpuUsage],
  resourceUsage: [Function: resourceUsage],
  memoryUsage: [Function: memoryUsage] { rss: [Function: rss] },
  kill: [Function: kill],
  exit: [Function: exit],
  openStdin: [Function (anonymous)],
  allowedNodeEnvironmentFlags: [Getter/Setter],
  assert: [Function: deprecated],
  features: {
    inspector: true,
    debug: false,
    uv: true,
    ipv6: true,
    tls_alpn: true,
    tls_sni: true,
    tls_ocsp: true,
    tls: true,
    cached_builtins: [Getter]
  },
  _fatalException: [Function (anonymous)],
  setUncaughtExceptionCaptureCallback: [Function: setUncaughtExceptionCaptureCallback],
  hasUncaughtExceptionCaptureCallback: [Function: hasUncaughtExceptionCaptureCallback],
  emitWarning: [Function: emitWarning],
  nextTick: [Function: nextTick],
  _tickCallback: [Function: runNextTicks],
  _debugProcess: [Function: _debugProcess],
  _debugEnd: [Function: _debugEnd],
  _startProfilerIdleNotifier: [Function (anonymous)],
  _stopProfilerIdleNotifier: [Function (anonymous)],
  stdout: [Getter],
  stdin: [Getter],
  stderr: [Getter],
  abort: [Function: abort],
  umask: [Function: wrappedUmask],
  chdir: [Function: wrappedChdir],
  cwd: [Function: wrappedCwd],
  env: {
    ALLUSERSPROFILE: 'C:\\ProgramData',
    APPDATA: 'C:\\Users\\zhuqizhong\\AppData\\Roaming',
    BSPRINT_CLIENT: 'C:/Users/Administrator/AppData/Roaming/Brocadesoft',
    COLOR: '1',
    CommonProgramFiles: 'C:\\Program Files\\Common Files',
    'CommonProgramFiles(x86)': 'C:\\Program Files (x86)\\Common Files',
    CommonProgramW6432: 'C:\\Program Files\\Common Files',
    COMPUTERNAME: 'BDR23M70BKCPR',
    ComSpec: 'C:\\WINDOWS\\system32\\cmd.exe',
    DEFLOGDIR: 'C:\\ProgramData\\McAfee\\Endpoint Security\\Logs',
    DriverData: 'C:\\Windows\\System32\\Drivers\\DriverData',
    EDITOR: 'notepad.exe',
    HOME: 'C:\\Users\\zhuqizhong',
    HOMEDRIVE: 'C:',
    HOMEPATH: '\\Users\\zhuqizhong',
    INIT_CWD: 'D:\\element-ui\\component-library\\v5\\juejin-element-ui',
    LOCALAPPDATA: 'C:\\Users\\zhuqizhong\\AppData\\Local',
    LOGONSERVER: '\\\\BGY-SD005',
    MYSQL_HOME: 'C:\\xiaoxiangPrograms\\mysql-8.0.28-winx64\\bin',
    NODE: 'D:\\Program\\nodejs\\node.exe',
    NODE_EXE: 'D:\\Program\\nodejs\\\\node.exe',
    NODE_OPTIONS: '--max-old-space-size=8192',
    NODE_PATH: 'D:\\Program\\nodejs\\node_global\\node_modules',
    NPM_CLI_JS: 'D:\\Program\\nodejs\\\\node_modules\\npm\\bin\\npm-cli.js',

    npm_command: 'run-script',
    npm_config_cache: 'D:\\Program\\nodejs\\node_cache',
    npm_config_globalconfig: 'D:\\Program\\nodejs\\node_global\\etc\\npmrc',
    npm_config_global_prefix: 'D:\\Program\\nodejs\\node_global',
    npm_config_init_module: 'C:\\Users\\zhuqizhong\\.npm-init.js',
    npm_config_local_prefix: 'D:\\element-ui\\component-library\\v5\\juejin-element-ui',
    npm_config_metrics_registry: 'https://npm.countrygarden.com.cn/',
    npm_config_node_gyp: 'D:\\Program\\nodejs\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js',
    npm_config_noproxy: '',
    npm_config_prefix: 'D:\\Program\\nodejs\\node_global',
    npm_config_proxy: '',
    npm_config_registry: 'https://npm.countrygarden.com.cn/',
    npm_config_strict_ssl: '',
    npm_config_userconfig: 'C:\\Users\\zhuqizhong\\.npmrc',
    npm_config_user_agent: 'npm/8.1.2 node/v16.13.2 win32 x64 workspaces/false',
    npm_execpath: 'D:\\Program\\nodejs\\node_modules\\npm\\bin\\npm-cli.js',
    npm_lifecycle_event: 'new',
    npm_lifecycle_script: 'node build/bin/new.js "input"',
    npm_node_execpath: 'D:\\Program\\nodejs\\node.exe',
    npm_package_json: 'D:\\element-ui\\component-library\\v5\\juejin-element-ui\\package.json',
    npm_package_name: 'v5',
    npm_package_version: '1.0.0',
    
    NPM_PREFIX_NPM_CLI_JS: 'D:\\Program\\nodejs\\node_global\\node_modules\\npm\\bin\\npm-cli.js',
    NUMBER_OF_PROCESSORS: '8',
    OneDrive: 'C:\\Users\\zhuqizhong\\OneDrive',
    OneDriveConsumer: 'C:\\Users\\zhuqizhong\\OneDrive',
    OS: 'Windows_NT',
    Path: 'D:\\element-ui\\component-library\\v5\\juejin-element-ui\\node_modules\\.bin;D:\\element-ui\\component-library\\v5\\node_modules\\.bin;D:\\element-ui\\component-library\\node_modules\\.bin;D:\\element-ui\\node_modules\\.bin;D:\\node_modules\\.bin;D:\\Program\\nodejs\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;C:\\WINDOWS\\system32;C:\\WINDOWS;C:\\WINDOWS\\System32\\Wbem;C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\;C:\\WINDOWS\\System32\\OpenSSH\\;C:\\Program Files\\Git\\cmd;C:\\Program Files\\TortoiseGit\\bin;C:\\Program Files\\dotnet\\;C:\\Program Files\\Microsoft SQL Server\\130\\Tools\\Binn\\;C:\\Program Files\\Microsoft SQL Server\\Client SDK\\ODBC\\170\\Tools\\Binn\\;D:\\Program\\nodejs\\;C:\\Users\\zhuqizhong\\AppData\\Roaming\\npm;D:\\installApp\\Scripts\\;D:\\installApp\\;C:\\Users\\zhuqizhong\\AppData\\Local\\Microsoft\\WindowsApps;D:\\Program\\nodejs\\node_global;C:\\潇湘软件安装\\Microsoft VS Code\\bin;C:\\Users\\zhuqizhong\\AppData\\Local\\GitHubDesktop\\bin;C:\\Users\\zhuqizhong\\.dotnet\\tools;C:\\xiaoxiangPrograms\\mysql-8.0.28-winx64\\bin\\bin;C:\\xiaoxiangPrograms\\mysql-8.0.28-winx64\\bin',
    PATHEXT: '.COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC',
    PROCESSOR_ARCHITECTURE: 'AMD64',
    PROCESSOR_IDENTIFIER: 'Intel64 Family 6 Model 158 Stepping 13, GenuineIntel',
    PROCESSOR_LEVEL: '6',
    PROCESSOR_REVISION: '9e0d',
    ProgramData: 'C:\\ProgramData',
    ProgramFiles: 'C:\\Program Files',
    'ProgramFiles(x86)': 'C:\\Program Files (x86)',
    ProgramW6432: 'C:\\Program Files',
    PROMPT: '$P$G',
    PSModulePath: 'C:\\Program Files\\WindowsPowerShell\\Modules;C:\\WINDOWS\\system32\\WindowsPowerShell\\v1.0\\Modules',
    PUBLIC: 'C:\\Users\\Public',
    SystemDrive: 'C:',
    SystemRoot: 'C:\\WINDOWS',
    TEMP: 'C:\\Users\\ZHUQIZ~1\\AppData\\Local\\Temp',
    TMP: 'C:\\Users\\ZHUQIZ~1\\AppData\\Local\\Temp',
    USERDNSDOMAIN: 'COUNTRYGARDEN.COM.CN',
    USERDOMAIN: 'COUNTRYGARDEN',
    USERDOMAIN_ROAMINGPROFILE: 'COUNTRYGARDEN',
    USERNAME: 'zhuqizhong',
    USERPROFILE: 'C:\\Users\\zhuqizhong',
    windir: 'C:\\WINDOWS'
  },
  title: 'npm run new input',
  argv: [
    'D:\\Program\\nodejs\\node.exe',
    'D:\\element-ui\\component-library\\v5\\juejin-element-ui\\build\\bin\\new.js',
    'input'
  ],
  execArgv: [],
  pid: 14748,
  ppid: 20300,
  execPath: 'D:\\Program\\nodejs\\node.exe',
  debugPort: 9229,
  hrtime: [Function: hrtime] { bigint: [Function: hrtimeBigInt] },
  argv0: 'node',
  _preload_modules: [],
  setSourceMapsEnabled: [Function: setSourceMapsEnabled],
  mainModule: Module {
    id: '.',
    path: 'D:\\element-ui\\component-library\\v5\\juejin-element-ui\\build\\bin',
    exports: {},
    filename: 'D:\\element-ui\\component-library\\v5\\juejin-element-ui\\build\\bin\\new.js',
    loaded: false,
    children: [],
    paths: [
      'D:\\element-ui\\component-library\\v5\\juejin-element-ui\\build\\bin\\node_modules',
      'D:\\element-ui\\component-library\\v5\\juejin-element-ui\\build\\node_modules',
      'D:\\element-ui\\component-library\\v5\\juejin-element-ui\\node_modules',
      'D:\\element-ui\\component-library\\v5\\node_modules',
      'D:\\element-ui\\component-library\\node_modules',
      'D:\\element-ui\\node_modules',
      'D:\\node_modules'
    ]
  },
  [Symbol(kCapture)]: false
}
```