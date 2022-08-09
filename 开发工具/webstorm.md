
<--- Last few GCs --->

[11884:000001C84367B2B0]  1798680 ms: Mark-sweep 3914.2 (4140.1) -> 3880.8 (4114.0) MB, 3810.3 / 0.1 ms  (average mu = 0.225, current mu = 0.041) external memory pressure scavenge might not succeed
[11884:000001C84367B2B0]  1804035 ms: Mark-sweep 3917.3 (4134.4) -> 3882.0 (4113.1) MB, 3694.2 / 0.1 ms  (average mu = 0.270, current mu = 0.310) allocation failure scavenge might not succeed


<--- JS stacktrace --->

FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
 1: 00007FF6C8A2401F v8::internal::CodeObjectRegistry::~CodeObjectRegistry+112511
 2: 00007FF6C89B3146 DSA_meth_get_flags+65542
 3: 00007FF6C89B3FFD node::OnFatalError+301
 4: 00007FF6C92E5ADE v8::Isolate::ReportExternalAllocationLimitReached+94
 5: 00007FF6C92D000D v8::SharedArrayBuffer::Externalize+781
 6: 00007FF6C91735FC v8::internal::Heap::EphemeronKeyWriteBarrierFromCode+1468
 7: 00007FF6C91802A9 v8::internal::Heap::PublishPendingAllocations+1129
 8: 00007FF6C917D27A v8::internal::Heap::PageFlagsAreConsistent+2842
 9: 00007FF6C916FEF9 v8::internal::Heap::CollectGarbage+2137
10: 00007FF6C916E0B0 v8::internal::Heap::AllocateExternalBackingStore+2000
11: 00007FF6C91929E6 v8::internal::Factory::NewFillerObject+214
12: 00007FF6C8EC5C25 v8::internal::DateCache::Weekday+1797
13: 00007FF6C93734B1 v8::internal::SetupIsolateDelegate::SetupHeap+494417
14: 000001C847DF9169

Process finished with exit code 134
