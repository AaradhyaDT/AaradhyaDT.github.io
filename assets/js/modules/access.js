/* ============================================================
   MODULE: access.js — aaradhyadt.github.io (v58.9)
   Access control, VIP gates, and Google OAuth integration.
   ============================================================ */

/* ── Encrypted Payload Data Store (Zero-leak AES-256-GCM) ───── */
const ACCESS_CONTROL_PAYLOADS = {
  "index-vip": "f4e44eff1d8fc8e84181ad9ee5f0b99e2a131a9f8ce3b9a2c5dc0ee97b948146b8a6fadc2346785f46509f5249b9b7c138ec53ec80b8f371bc679b8d13e52be6af4db62b56bdbbccb8fce5014896c5d6b4de40226ca5b79318ba818b6e5845cced0ac57854dcaf76d27c321ae2ad9ddaa7bcccbe274b9ca79617b72a358e440866da3cda4ce2a22bc0ed7d91c45114f244849dc1c96332cde34f81ca2772875c327315da8fa5d536a3e6a89efaef373a41dceb3d690c451b4150c3b8d9d4e68cd34b5c83c3e08921f532b68f0b5de5e2365c6936b07c348fa814df195a89083f52506a5ce7213d2ac6bc243fa312600008ee54a4fa19887ec741312fe89d85376c81ea65e27065fa02bba19eb55bdcbee9f48cf9170a1daf622eea7b36c4ee7024d5f7eb78524281601c9949bd67ed3b36440742165cf8fce914bc8b2f8a21ea61aca6c2737f4dc57a2ee97e722a34ee5a15f8139b49eb1c2fddcb99c79b90bce8e08b9cc7e3851a585cfc78490e71407457fc4bf85106baf971fca0498c40765648f4dc50894b6408976e84a7f383b281817f3be45d799da95bdfc778583959efe3c13ab99111ec0b00ce012104864743b7aea9ca644c1b252a027d647ec66c6eaf01d38dceee9bc48ff6fd9bea20d341ae82a966c3176e5e601de173a9361c207a0765d433ac52bb9ecb2420d046c8ea907b8449db6c3bbe0daecab9b22e6638c1bc9d583b1318189957637f7731c8e6071d8305b8380c78fb69ac0d14d40e8f9dc2124e2ec176b7af3fd1dfebfe8f773a4e084b9270b0d8b4ef55daffbadbb098b84f7ba8f22ccd531269f86cd020127266d1d512d984a1d2ab6f07d6008a993b9221a66d31744b13535bcceb444af62c7b607fd2e9d769131bacff052c035eecd7a11a3ffb2d8ddaebda909a73019eca4d69e32c7efd4e16bf7edad054aaa419aca0578360aed5d6f72bbcfcc574002c3392bf233645bd81f7151c7bd95e0543b36beaa0267f9b4cab49c503a31d40d8b06f111e7479522e90a061ed87b8f77ec89203fbf364444cf641dd1e0b793998d6f10c418863f5b5864bd4db7b7597810086b5795fae5a7e479e76eb4f3d0bd4f3a28938e03ea92df75fcf81d47f1bc45317d68ddbe7b8fff330eb48ffb98bbe27a0f71a3fd5324fdd3666c5b140d3d345116dc6a2046cbd9fffab115e7ba62f0de8844bf8aad5489eaa2798d25d5e5b69322291d3735ace04991948503a74875db7e218add3dddb7c9603e9e8850c2956208977bbc1e8520b0c5fbafc9f0fe367a3950456a92acf4352e070dc9669194f56132ed681c6ccc1cee94632005eb6a30d3548274a72430dbf4c473e7554b7f41cecbfe616a6ff7bb8772ebbef267a3987974cf67d81b1f9cd539f37dfd9bc0868be3769253b84e3ad871bc21241e9bd3ffa07df7ca79a4d313e4573546b0f3aa984165b30960e8a399ea6f9a6b13318464770d2ffd7ec154d41277147a426d7566986aed271bd9928a1bdc0bcd91f6d26e2f0fdd9cd8428924038b4a2c7758957961bd7e34fc2ef7e3e3451b2d6e10bfe840318b403dd154bd391b7099508cb14f058de926add4501a08786ce8a7d7f17bec5bf16f181330c4934f5003b2c43bbade5dc871155d8b7cfffc884a8e79dbca7944c49ea84fcda878551be2ca20922a640435b3e327a3f34fede08e595f2730b04ba931dd4ea561427c94b2d2d4fcfe6fedeb22412b6be2f7e8f93b2ea67689c3c7382585f70e378fbddfdaa41598f3f4cffd358d609f2d3676022812ef4a1b0b58b36e949cd98530fb91deb2cbb1eebeba8599cff986178d68d193ff04d7e45c20ae7540b419b58a114dffd989ef6bd0e66a3ac2682993c64d4d07bc2aadeb7dabb919f02dd5c47ddee07332541014589dbb851a66e482cd936420ec9913b19b5db9d3917a7f2e8ae2625438cd5a9ac5ce394c984e660970ad912bc0e7642e8ba92572c80f0ace8cfb23ff023b605cf632c4cfb36eb316726b250a25d2fa026e6b2fd8eb9448133ab57a5701b24d739c55792d80a5bc816df5ee26b161b1e72969e319a6ec933212d82bd240fbaf0f77d044ab191be0678d311792ace2cd4373d87f26f35860be0e780bf501fc14d95746499fdc68466e8bc823b936eb0acbdb8ca624f38d06f425f8c19a3b1c9f8a967cdd6c4f70af22d96197d8a2cb77aa8599e06fca237550c0f0aec8fc096bdfb0695e49f8c4e9cec0903b60e56e28c6f2f385633a21b170b3b9ade28ccf0cc94e8519811eb93bca8dc3f79aeb6ece84b39f58ac1bf2ec55475945ae3deef72fe429955ce5cad6859dfc301694cd1bec0e712b75d69103dc71ddc98c319425dee5332ea1f4670740749786790515490bf38c4a585abe42c88ba06433780500dc61726fb41c548e0049e7b5100db38beecfdb3b5fc1880b504f3b8ca58a2477ecff4be4b1aee91ae360b8fd5c8cf33043d10bcce1857a78c2cf11f434d263c276c21a2a322a3711621b31c26a681e2d546f5ca1b4c90f7737f76c08f7d1dfd5f7907fe747466a44876f5023c0fbaf22988912025277a7f3faf406fb7d0edc4c95e9dc85801dea1b763be8e3d21281083530187a577325bad68889dc39e53801a81b0a08d962cd00fe30b81831b4b54b2424880e65df04abbd599cd1bce59617d8def6d38d643237c387abe2c14bb0920883f50ac3167b57f96560c03e4d2a29327f85fb1e588135d80fd32cdbcf5f6731e9abe90cd4e4f547f79e0cd7d46d7a27cdf5dc302774860bc7d36e19e8306ae5bfd3365255bb2b7cf2999c72de63e9fa056d732ce7e60d46f006df82e87d4056f0211f0c860e3e8a310864d385418a0e173dac7936850e029834d6fbe34571aca9751189f7103105b933a26e87a7f6de4ae9f30f10488c17e3083244efb9d03dbee7f0ff8a1b96d1c2fcda4d9b8ab94382141c62772237c111ff0f534f7bbfa7f97257f245bbdee86d08f45978182085028a0c45b0ca9d44e3d1bc2fcd831d719d0baa6d035fec41dc5c167cde7c5918bb05e38648b19a668da99fa0c59bb7b82f17e782f33a524d57e3af6785b96bd41bf90173668cfa12a72b2d742f73d967d9458886d5f81e7c7477908c907348ff5ca4d51586519006af1657c88dcf569c53c1cebddadb62617bdf91769e68f2f0380d3be2783e00cd6694c524970cc9fac51687780",
  "index-master": "c0b2cb6a22d33ef34c990cca619ed4e57559c7d108ecf23ecacb58956a2563365ef02f2aed45a4afd323da496aeacf3b0676e70190b1da7c132c94e6b9f690623e10e072ae0962592ad4162be9400fa0f491636ea5869e67e6de504e5a773c3265fcdb380871a98d4798e7958f629f832a0d88a114df86b0ae1281c638a2f29db59323cf75e89530546e05d98fe48494e34521406710e1e385ecd03d6c00cde37757e4857c889f05acff0596917f77c141b96ab0ba906999a2b161f6a9eccaa43c78a4d837a26c3ba994b43d69a85501ebad8110c00b6bf54017e0c1d838091b6774bb58f8fb4385b9e7de6c4cee6b6cd7c3acf463fa68d7e2a06ea606844f81257fafd81db5d96a244c1f5660956d116f0bd62d74be02f47ed751c5abf91a71881bc098d944c6bb1e53874bb26509d27364853c1df5fbdfcfb63ad324c4c0c16f0ae652a70e9f6b3888023847daddd58155308ce6f4110b4893dea3d3ba4c66e0282db0ac31ce2c53a13ce71e7e27f4c74dd1f9654cd912c0fdcde6fce9b6bf2b4da9f097bc270d3e10abf52c8222c3508f118d11023af54d58704f310d1bec07743fe6a45bced6dc7946ff770a5a8720e91035e391ca2fd9599cec31fa48706c08b346052c8d09beb0792ad9da6abcc97d9b4fd273095ca654ea238eb43258ca75b6af5580f4b2ec52011834ba950d995357ce0c362a3b8b7ffbb20d7450aa383a22bfaa87553671dae9062769ae8d28485e58d800cee0c05677733200ac17d7aac7f655a3b44bf9a789774cdeb2db41f02329ea6ecb88a9d7cb12948ea666ae1a295dc79c8e74240921c63d406c314efc61b3923a00c8600fa6f72b350d689501ffe040b792bdc5efd8c1674b7830cbab172f9fec264415ce58f93894a329df63701f1058375f03481f8c390aa5f6e1de0ec00d4e328cd3fa32b265b0e0606226b60625948c052d9c9b58800a5cfdf806c4beacf291d4d764d9d04173ceb0af940d131acd1fbe6e3b1bcc353ee606a3a2be003c7c24edb0a49122917f23a2a1c7346a8c6fd11d4acd05b8a236488b1048502c6040c6deafe7f9bbddba0b67d24df6e1b4b380be9a45646faa57dbdefc77705543b7be0a12712f6de27776a37b2c6cd87532ecad6463b6813c5866d1a34f40034ea19c3863d6491b7aca3af5d741b958f07cabdc482a469a5b0f1b490df7d1b373c350642337f6234f45b324bfa215ce9365a65c12d60ffd826ca7e1bc903310838b5b0e3258e83e742191303e285299a9fb3b175a723d0c7b310f09aa7fbf8eb1e6168ebff579b844039d738609a63e94ecc8f0c0663166edd5cc15525f2e5c31b2958a9928de6e1dafbc6d3b409507a3ad4f588f9a1eb275e3bfe3f0bf7bfb1d613febbc693715796326ab567a06f93c25b9eb072007027e27269789453e0b54b8bba2cdaa7f6da3c08da3e0c73e027353be5afbb8be7cc2915053cbed0c3edc1d76088de5ab12360d56030eee2379b0c443c3ed24201e3a174789ec5fbd283a39df4c11bef9cecd7e873c7441f6e25369f03ec28606b4199b6b221c86e1957b22ec054a3947f637bcea35d4190940a7c4bda5aa4611b9e6a3f8f17a771abd7759649690cd138e1d4b70df91c2bf88484c7c923f41c5a871ad378fb5f01072800479f468dd43fd2db5fd178a59d10106806c1f0652285d6612ab5ec84b62954cbe42b3c56fec630dba76ee42129035410cfc742a7994dd91efcdc790652d51e857bec580eda640b7f3f1cc4f12478bb204b7f1a5189cff0081d57938b1879085e2525a1e05188471532ac49bc1b79ff12e11841e6102e94e4060d43334612a9ca780ec55022a130f5f7f0644dc970281b14816825c6e6f56e745593af6dae8b0005f53b4ae9bd524dfd7858ae67344f741e9b9a445635030f6f238cabdf5840bb0efa7a6c54be44f90846cd00383bd4202cadb67a422580e8d9b3c35740998b9aa3a1b5bda0c392a486f146e760b86966e76c45c0402b57c4c094f81759c0b828433488f7d7f64bd0999b1057b99960d62a4f23e61cf1c32abde047effe00a3ed53f0d2b027e8ae606d8dc5ccd72d04aead997d8ba85beced1bde056a4b71a83f924a8bbfbb5ab6ddeb9f5f4e9db0cc6ebdfb9b24c035b0707467976ab4457b4c2fa739e03334ba85ad3602e",
  "proj-gcsbr": "5d1db65d4e8562edd1ac594e2d74d70e8b33d495d2a97aab47f78de5edbab3f9a9bda53bc519577fba32e9a4fcc21b9ccf5005ddbcb27d9afb9a788abbf2683b519c920cb8fc138b502c88e1bff0d9274f0ccf89ca0814f7f04fbde7ab5277adf5",
  "proj-fuse-wk11": "41018a076f73311a0afd2187afe04117167385274fa9f9340a3b084cd120c3b4820982baa976f0b2c9bb17122bbc36517413c34e04a05812909dcf2c18f614a54af8d8eac4dda3b39d1aa06d21a604cd0a67799a59091a274f59",
  "proj-fuse-wk10": "74e9229834b346861db4095552cf059a34efb2b2be3c38e59dff6b5eaa53b5012bc943b71e1b6b37ab331b011babb1f6c78e55b43bbaa20053c959e9a0932ae3f41a3c9a11f9ec4bbd1ad43f2a8d5eb7822b89150f7e2a",
  "proj-fuse-wk9": "b7cbbb6581ee829b37cfb4b1cab5d97cbae5b78293c45e19381f142176b619cf13b8124e6dd573a8a51c34d9aae5950969ffef8fa679fe6969b4f047491b6de5432e0042ec6d151b4b997d1867836e12ec89dee8",
  "proj-fuse-wk8": "03ef2f976161795a4d031a1b9b2c9796ad9c03fb8240cbf85e29f7085919f4659eb7b129ad91668d69fa10ce46ad6a1fa339f44b3804d9197b19ae82a0b270352f8c934aa892dbac2428ea8d25d6e29caac39359db71b3",
  "proj-fuse-wk7": "136fc7411b1a218a4a6454d434968273697f12d48acc04e21f1942176d26dcb0cc7b7c539460b513c9a26727bbdfe85fba3f172bd535d526ab07b02a70246a1ca34ec8d7926f837595bb1b36728ccc955107b57b88bc64ec60b8f1",
  "proj-fuse-wk6": "0ec2ae81cc9e6afc5f36a4550ce3ec7395aa640483c27fa8de876a8bb5d8d05a455141bd69a375ed743266309d9cb54715be55b282f938fcf07baa9bfe41403438cd6918865e422e32dd0fe1ec90b74791cebd06edb3889934b7",
  "proj-fuse-wk5": "9e465544f4663bdbec2fba7bf3e810e6c5c84a18eb30b19471c7d892d438a0c3bcec4e160bed91824dd7f6cadae6981bd38ba283febb9cd8f67286051d90cdcd0a54219cb3063fbf17ea8a96e776d11d63c30066cec5a422f587da",
  "proj-fuse-wk4": "15f221533283d76887be64d7ba6d0ae2beecfad9284857103ef01bf359d82ad2c349679c67afb529cc9cbccb18f2e88eaac51beb79033d2897e91a3c1df8900044862ea2904c08fdf936eee87d7c9a5da3b7fc",
  "proj-fuse-wk3": "9b2dd419e336c35dcc124b54e0e8d3b5fd48dd7b4f1ed9895ce35996b8a879f4fa8cc07c2bef3e74e8befff5852a669fe346ba694bb5b6c6e272ef7f2f8ff7d92b88c2a011393228413df0b307ad",
  "proj-nexus": "30f26e850c78aaa3931999990aa920ae222457b6e79053cb0249195d3ea2f155d720fa0534dc5b7412b7691e12a2137d52791a26174e1d4f4a5f481073c126",
  "proj-alpha-superapp": "2c5b90f50b5ef3637f0f20f3a4288c2613d128a05fc36748c7525837003b7b353bab6ad3c07f33518468e05307845e95680e0fd948c49369a77536a8d387534b68c27b4e210539ed",
  "proj-stability-ai": "81e7def015666a332e375780bb742a193e7a8a98f5997087b81c0e11cb2f2e13cce5fd7fec99d714d842df7ff562b87cda03e35a019187bb63ed20b88fe88577ad8c83a6f30a3869222212ad38",
  "proj-claude-desktop": "ee4fc1b66bde33d12ebbe5c5f877012ab87e56ead3c03a48dd457cf12450eb550a369e6032d3e4390dfa4f3b8d9fb3db54d3de45958e856a17e8a5dc7db3d854891ff3b3675151c7a6646175666e6801ff13df",
  "proj-fuse-wk14": "668fd926a8cc38ff9a6d96abf1f3bda52ef436f7c4530e2c1382d6e6562c783ac0833879d3bf3830eea78f07b320ae496691d2010fe4abdf94297d949b151e7dff4a47894c55a06ccbee03752e6897132e43bfd8ca1e",
  "proj-fuse-wk13": "9211d407d162f58342486369cfbd174297b5dde574a39d90fc3f9c3d066b5d180bb8afe69e4500f099f128a9df624660d6d15758a45800d003ce8629112109083d7875aada5584218dbc8a91a25f19e789e69c562715574b3cb59db96b65c3",
  "proj-fuse-wk12": "24157ab1bc86408905a10f960a1941f3e99802e17dea5e12b0544771187096f27508053e0730ac7c4bd85097dc7eaa3e78994d4eccc05281c867d6b393341c85bf0ca7ab637e1af1acb97ed25d071677f8217e82b25f22cf5a68c2",
  "proj-fuse-wk2": "a10b2c6c129a4f1693cc4e699b0b7b738f35d468ce2c1726f0acfdfe600323db533317e50ee909c6cde303ec6b04a669a743a126d844fb88f54c2587f5f268129f1152c4ccc6279aeb318e755c1c815fff30692f1c86",
  "proj-fuse-wk1": "bd5dd4c918de33e83189f627c7b418f409bcbc9694f42390253ff3d0ebf84a8c67c6ff07a3e5850a3952e3f60ad4af2429dae624d75d91ecfbc292313806291513e5556275783e888f9ef621936b880ac103b3d1",
  "proj-onm": "96659e77141f79b2a72441cdddc1f6c95584dbabf61dff85b348d656aa253a90454a4961831f871a4c6a5c080e560c2631891a2c3badcba0853c278a29fb0bc0d1827724aecea497c5016eae70bab62411f9721f",
  "proj-react-ws": "4cf74fb417c10e4113f16ad12648106ea4847451890459a68b3c8ef3ddc2ddc2a6ca7b8fbab20851f0fde13eb043c69d25462f83eedb47fec2bd0e9fa0a942703e3706bb0b1899ce12a6fb5d0af00a9611450e",
  "proj-crypto": "7cdc79f996319b2ab023366e0bae5e876415ed1409865eb30a2180857083722eb8a1f341731a56e71ffbf0630377d108e1bf5d7cc3844e7a7f5b88bd8fb0f35577bfdf1a4ee0396d7d557fdc43e85481c367",
  "proj-pulselive": "4d66884d0fa7de8841678e42cf97971ec47b03bd58a8ffc099877e6308595b4b0cc13200e88cd0dece842195913a715299d294ecc6cd0790347d698f90cf4956cb9ed2e2a0",
  "proj-sys-optimizer": "e1e293f58b395597acc5376d51b878970f86defa09e4f9292f16b14497466a7bf5e543a10ec4112e08f580f0b65a4abf0ed693b6a33ff3a51f8352dfe83744000242a4ac7aeee66eebfdb6e96bb485ed8f85df15cd",
  "proj-md2pdf": "fa1ca4c1d0f8979b6dee3d87f24e3cf31229f8ea3d7d797d1bda50f8bfed9c25351c7399c46f11056222b13db2b6affbaf178240b74587544642ea9380a7e2799e44e235338f202e30abf5acee92fdfb29797c",
  "proj-spark": "94838fd57ff964e42bad1c97324358020b3ee23c3d1d755f7fe7042051fe83dcf65c01074a738e1c7324b3b8672edeebcdc4a38c66905834c746387cc9209d94959a5480ffadac2741c8",
  "proj-biasaperture": "a62ece770d10c9404539d44e92b31faeb47099f42a90234b98b8a41950abdb83017884cd01a16260aaa8fdc916bdabd5cf42cc992751985644602746df956af7ff7ff55677d71e5bc4cc25d61d7ad92cb90158af78fb506423377063c2158f64eb006afa34d4958d23b75c69a81363f04c9415d65568e07a340d75f4cf3c806058606fb6ccb63e1938396f09addc4a9179f4e2458c92075ea607a1f4",
  "proj-brainstorm": "6812752c1acca40a87941b756b9e2da6aff20fa0b75fea8ad2102d9934ff64504ba069401428436f3d0c4b52bf6e650f39c74bfa28ee5e47912875a44d0592eb233b7d5eb3a7a30b7e84a408f0633b",
  "proj-super-nlm": "2963c6c84a7fd7cd7dd6cb4099db4da7f4eb02c814933afd72f92dfde4fd8a6df3fc40806e3de7d5874f3b05a59167b882103a646a34cb04f9528a64fb3c1893416bd5d8c49552e542642c02eda7",
  "proj-github-pilot": "8910c900f526370d1f178458a577c8b6416543b355fa305c6bdfe603b0ad9a5e37478e9348da73d2c2322374bd08c928948fd7ecf4c833df635d8ff4aa6056b1a5ec5ee14bbd9c53a476503413f469be35",
  "proj-windows-pilot": "04cf775837bcb6d8d3d240110864b1e721e9d1345bfe1497acff69c1624bff34237075c075546085b4cad9915b12788f9b7ee926dc45128c4201b8ea1d25aece5b33acea0b7380",
  "proj-nepali-ocr-ai": "17a4ce559ff0feb7bb5c956deeaba11aaf42f047e78d48bea12bb6d484d804a558d0facc7c34605baff44269acd9c25d8a46381590eb49e7446f33d4fe0d56eba36946e4237532",
  "proj-localsend-mcp": "9197307aa44b8b207be4ff917425d3bd62ba66737a18134235732c7cb495baba5216392c4f1b7b238a391bbefd8a7985fefc83328be0b81ebc65f004204a5494eeee5a80b6dd24",
  "proj-google-classroom-mcp": "e1e0999f244bebef86eaa370758f07e92221d780a210efe25a84abd283b9e15ba2f07dcf3a28e051162e5b1614602db3e9e773f9467401210fd9cbc7ab082c4abcf3132fd6428d972034e936cc02",
  "proj-typora-mcp": "68a846910944a01ea46b482c4880b15ee82ef28c6d0c3f75d6c81fd61d168482f94726abd4d70c226118f9fa236c60b46b9195defdc11f2f0fb65919ccbfa5c3591ece82",
  "proj-ieee-xtreme-archive": "bc91b7bcb49ab65cc675f6e7def14dff49bc9fd3984e322afa29490e505c59f36bf4995092513fa50b434931f0b82dd9890ad855737f582f4774ff49fe81a0db8ac4aefe90f3c3af1f8e1ca82c301965f3a5c5765643c2c1",
  "proj-fleet-orchestrator": "8df3212e5cd751f2856d16eca6c90d6486eba8afb20a25d11128d1a237a03a23ddef09ed80193a5fa5abe65e818597d3c6e7d05c36cde3377ec0cd1dcf296bd488956f00704a2819d95052c2",
  "proj-agent-customization-sync": "96b4e327c55084e755c927e112eb4de3380e508f99ea2a0028e630a0f15c760a3a702fff7452f3682588d31bc44d2888150251a5d4cb86eee4a4e94f54105cdb799b1873a019800881ac18c9048e4ec0060c6835b8e98c8c08aae9909b",
  "proj-fuseaif-wk17-telco-churn-mlops": "7578a7c16db322dcb0e6c68e8a0e58e795dbc72ea52eb2aac88e2ba77aeaed30b1340591048a639ff0cfffd815d2fecaf9f928cf9579893d6ee69025f7c2084779683999ea40e604efd139d465d19d9676e47b1b8079080d",
  "proj-fuseaif-wk17-agentic-mlops": "11194504f9037d0ad99116e2da06b575cd4046198a9dc29f456912083c09733be5b15f425cef99c4042324a238df112ba16be477bd51f007b2ca1dbf5c01d5e4ca4c5f3c64a0b54766d3dc42e06ec94ca1e0434a",
  "proj-fuseaif-wk18-trustworthy-ai-guardrails": "d94436216186c5ec12e7a1fedae3d43c18174c9e7ac6f40d0e1fc5ced9bce4ba289cf439fd5816a3bac160998a6dc0f966735757dcff9a354cb5d09b631ff4639fa9ac8ea53f196975a742423337e4b9e8de20f1c2c33f949b0ef46840490b71",
  "proj-fuseaif-wk15-ai-assistant-rag": "6bdf5361642c759b3ff540cbc5d117e85cd056bf4a396608ac74a1877b5032b030cd865e0e19d3dab1ba2c48a6597048d84d7f4365dbb5b4a69d58a182ab3ca36d8839dae56220a01e56e05f8d52b6bd5f007bac02c976",
  "proj-fuseaif-wk16-agentic-assistant": "8494f2a492c0cc444f8f34ef2cd605ba179e402673763c70ccff61b759931e00ccbbd39c22cef420a0573f5f95d3675c3e4be1306903287c73f073d27c6821fe3fe67229e9f452d280661aec6f0a5193dbf295f416419b1d",
  "proj-competitive-programming": "20dbd54cbf740b6fdff8848a267f5ac46d961360860a054d9274bd7d5fb20bdef6819fa120905eae689084972b6a40c01cffdb624ba0464a3bdfa5acd377b547c79f7826d61318a1a4d4cf81750e57e717908af78b401932993bf83c"
};

const KEY_CACHE = new Map();

async function getDecryptionKey(passcode) {
  const norm = (passcode || '').trim().toLowerCase();
  if (KEY_CACHE.has(norm)) return KEY_CACHE.get(norm);
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(norm),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  const derived = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: enc.encode('adt_salt_2026'),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );
  KEY_CACHE.set(norm, derived);
  return derived;
}

async function decryptHexPayload(hexStr, passcode) {
  try {
    const bytes = new Uint8Array(hexStr.match(/.{1,2}/g).map(b => parseInt(b, 16)));
    const iv = bytes.slice(0, 12);
    const tag = bytes.slice(12, 28);
    const cipherBytes = bytes.slice(28);

    const data = new Uint8Array(cipherBytes.length + tag.length);
    data.set(cipherBytes, 0);
    data.set(tag, cipherBytes.length);

    const key = await getDecryptionKey(passcode);
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
    return new TextDecoder().decode(decrypted);
  } catch (e) {
    console.error('Payload decryption failed:', e);
    return null;
  }
}

/* ── Access Control & Gating Engine ────────────────────────── */
const ACCESS_CONTROL = {
  TIER_PUBLIC: 0,
  TIER_VIP: 1,      // Higher Tier Access
  TIER_MASTER: 2,   // Master Level Access

  VIP_PASSCODES: ['vip2026', 'vip', 'tier1'],

  sessionKey: 'adt_access_session',
  simulatedTier: null,

  getSessionData() {
    try {
      return JSON.parse(localStorage.getItem(this.sessionKey));
    } catch (e) {
      return null;
    }
  },

  getActualTier() {
    const session = this.getSessionData();
    if (session && typeof session.tier === 'number') {
      return session.tier;
    }
    return this.TIER_PUBLIC;
  },

  getEffectiveTier() {
    if (this.simulatedTier !== null) return this.simulatedTier;
    return this.getActualTier();
  },

  authenticate(passcode, requestedTier = 1) {
    const now = Date.now();
    const lockoutUntil = parseInt(sessionStorage.getItem('adt_lockout_until') || '0', 10);
    if (lockoutUntil > now) {
      const remainingSec = Math.ceil((lockoutUntil - now) / 1000);
      return { success: false, error: `Too many failed attempts. Locked out for ${remainingSec}s.` };
    }

    const clean = passcode.trim().toLowerCase();

    if (requestedTier === this.TIER_MASTER) {
      return { success: false, error: 'Master Level requires sign-in with an authorized Google account.' };
    }

    if (this.VIP_PASSCODES.includes(clean)) {
      sessionStorage.removeItem('adt_failed_pass_attempts');
      sessionStorage.removeItem('adt_lockout_until');
      this.saveSession(this.TIER_VIP, clean);
      return { success: true, tier: this.TIER_VIP, label: 'Higher Tier (VIP)' };
    }

    let failures = parseInt(sessionStorage.getItem('adt_failed_pass_attempts') || '0', 10) + 1;
    if (failures >= 5) {
      const lockDuration = 30 * 1000; // 30s lockout
      sessionStorage.setItem('adt_lockout_until', (now + lockDuration).toString());
      sessionStorage.removeItem('adt_failed_pass_attempts');
      return { success: false, error: '5 invalid attempts. Access locked for 30 seconds.' };
    } else {
      sessionStorage.setItem('adt_failed_pass_attempts', failures.toString());
      return { success: false, error: `Invalid passcode. (${5 - failures} attempt${5 - failures === 1 ? '' : 's'} remaining)` };
    }
  },

  saveSession(tier, passcode) {
    const data = {
      tier,
      passcode,
      authenticatedAt: new Date().toISOString(),
      userAgent: navigator.userAgent
    };
    localStorage.setItem(this.sessionKey, JSON.stringify(data));
    this.updateUI();
  },

  saveGoogleSession(tier, passcode, userProfile) {
    const data = {
      tier,
      passcode,
      authProvider: 'google',
      user: userProfile,
      authenticatedAt: new Date().toISOString(),
      userAgent: navigator.userAgent
    };
    localStorage.setItem(this.sessionKey, JSON.stringify(data));
    this.updateUI();
  },

  logout() {
    localStorage.removeItem(this.sessionKey);
    this.simulatedTier = null;
    KEY_CACHE.clear();
    this.updateUI();
  },

  setSimulatedTier(tier) {
    this.simulatedTier = tier;
    this.updateUI();
  },

  updateUI() {
    renderAccessNavButton();
    updateGatedContentVisibility();
    renderMasterControlPanel();
  }
};

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('JWT Parse Error:', e);
    return null;
  }
}

function getCustomVipEmails() {
  try {
    return JSON.parse(localStorage.getItem('adt_custom_vip_emails')) || [];
  } catch (e) {
    return [];
  }
}

function addCustomVipEmail(email) {
  const clean = (email || '').trim().toLowerCase();
  if (!clean || !clean.includes('@')) {
    alert('Please enter a valid email address.');
    return;
  }
  const list = getCustomVipEmails();
  if (!list.includes(clean)) {
    list.push(clean);
    localStorage.setItem('adt_custom_vip_emails', JSON.stringify(list));
    showToast(`Added ${clean} to VIP list!`);
  } else {
    showToast(`${clean} is already in VIP list.`);
  }
  ACCESS_CONTROL.updateUI();
}

function removeCustomVipEmail(email) {
  const clean = (email || '').trim().toLowerCase();
  let list = getCustomVipEmails();
  list = list.filter(e => e !== clean);
  localStorage.setItem('adt_custom_vip_emails', JSON.stringify(list));
  showToast(`Removed ${clean} from VIP list.`);
  ACCESS_CONTROL.updateUI();
}

function promptAddVipEmail() {
  const input = prompt('Enter the Google email address to grant VIP Access to:');
  if (input) {
    addCustomVipEmail(input);
  }
}

function handleGoogleCredentialResponse(response) {
  if (!response || !response.credential) return;
  const user = parseJwt(response.credential);
  if (!user || !user.email) {
    showError('Could not verify Google credential.');
    return;
  }

  const cleanEmail = user.email.toLowerCase();
  const emailDomain = cleanEmail.split('@')[1] || '';

  const siteObj = (typeof SITE !== 'undefined' && SITE) ? SITE : {};
  const masterList = (siteObj.masterEmails || []).map(e => e.toLowerCase());
  const customVipList = getCustomVipEmails();
  const vipList = [...(siteObj.vipEmails || []), ...customVipList].map(e => e.toLowerCase());
  const vipDomains = (siteObj.vipDomains || []).map(d => d.toLowerCase());

  const isMaster = masterList.includes(cleanEmail);
  const isVip = !isMaster && (
    vipList.includes('*') ||
    vipList.includes(cleanEmail) ||
    vipDomains.includes(emailDomain)
  );

  let tier = ACCESS_CONTROL.TIER_PUBLIC;
  let label = 'Visitor';
  let passcode = '';

  if (isMaster) {
    tier = ACCESS_CONTROL.TIER_MASTER;
    label = 'Master Level';
    passcode = 'master2026';
  } else if (isVip) {
    tier = ACCESS_CONTROL.TIER_VIP;
    label = 'Higher Tier (VIP)';
    passcode = 'vip2026';
  }

  ACCESS_CONTROL.saveGoogleSession(tier, passcode, {
    name: user.name || user.email.split('@')[0],
    email: user.email,
    picture: user.picture || ''
  });

  closeAccessModal();
  if (tier > ACCESS_CONTROL.TIER_PUBLIC) {
    showToast(`Signed in as ${user.name || user.email} (${label})`);
  } else {
    showToast(`Signed in as ${user.name || user.email}. Enter VIP passcode or ask owner for VIP access.`);
  }
}

function getGoogleClientId() {
  return localStorage.getItem('adt_google_client_id') || SITE.googleClientId || '';
}

function promptForGoogleClientId() {
  if (ACCESS_CONTROL.getEffectiveTier() !== ACCESS_CONTROL.TIER_MASTER) {
    showToast('Only Master Admin can configure Google Client ID.');
    return;
  }
  const current = getGoogleClientId();
  const input = prompt('Enter your Google Cloud OAuth 2.0 Client ID (ends with .apps.googleusercontent.com):', current);
  if (input !== null) {
    const trimmed = input.trim();
    if (trimmed) {
      localStorage.setItem('adt_google_client_id', trimmed);
      showToast('Google Client ID updated!');
    } else {
      localStorage.removeItem('adt_google_client_id');
      showToast('Google Client ID reset to default.');
    }
    renderGoogleSignInButton();
  }
}

function renderGoogleSignInButton() {
  const container = document.getElementById('googleSignInBtnWrap');
  if (!container) return;

  const clientId = getGoogleClientId();

  if (!window.google || !window.google.accounts) {
    if (!document.getElementById('gsiScript')) {
      const script = document.createElement('script');
      script.id = 'gsiScript';
      script.src = 'https://accounts.google.com/gsi/client?hl=en';
      script.async = true;
      script.defer = true;
      script.onload = () => renderGoogleSignInButton();
      document.head.appendChild(script);
    }
    return;
  }

  try {
    container.innerHTML = '';
    window.handleGoogleCredentialResponse = handleGoogleCredentialResponse;
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleGoogleCredentialResponse,
      auto_select: false
    });
    google.accounts.id.renderButton(container, {
      theme: document.documentElement.getAttribute('data-theme') === 'light' ? 'outline' : 'filled_black',
      size: 'large',
      type: 'standard',
      shape: 'pill',
      text: 'signin_with',
      locale: 'en',
      logo_alignment: 'left'
    });
  } catch (e) {
    console.warn('Google Sign-In initialization:', e);
  }
}

/* ── WebAuthn & Hardware Passkey Authentication (FIDO2) ───── */
function isWebAuthnSupported() {
  return typeof window !== 'undefined' &&
    !!window.PublicKeyCredential &&
    typeof navigator.credentials?.get === 'function' &&
    typeof navigator.credentials?.create === 'function';
}

function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function hexToBuffer(hex) {
  const cleanHex = hex.replace(/[^0-9a-fA-F]/g, '');
  const bytes = new Uint8Array(cleanHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  return bytes.buffer;
}

async function registerMasterPasskey() {
  if (!isWebAuthnSupported()) {
    showToast('WebAuthn / Passkeys not supported in this browser.');
    return;
  }
  try {
    const challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);
    const userId = new Uint8Array([1, 9, 8, 4, 2, 0, 2, 6]);

    const credential = await navigator.credentials.create({
      publicKey: {
        challenge,
        rp: {
          name: 'Aaradhya Dev Tamrakar Portfolio',
          id: window.location.hostname || 'localhost'
        },
        user: {
          id: userId,
          name: 'aaradhyadevtmr@gmail.com',
          displayName: 'Aaradhya Dev Tamrakar (Master Admin)'
        },
        pubKeyCredParams: [
          { alg: -7, type: 'public-key' },
          { alg: -257, type: 'public-key' }
        ],
        authenticatorSelection: {
          userVerification: 'preferred',
          residentKey: 'preferred'
        },
        timeout: 60000
      }
    });

    if (credential && credential.rawId) {
      const credIdHex = bufferToHex(credential.rawId);
      localStorage.setItem('adt_master_passkey_id', credIdHex);
      showToast('🔑 Hardware Passkey registered for Master Admin!');
      if (typeof playAudioCue === 'function') playAudioCue('open');
    }
  } catch (err) {
    console.warn('WebAuthn Registration:', err);
    showToast(`Passkey registration cancelled or failed: ${err.message || 'Error'}`);
  }
}

async function authenticateWithPasskey() {
  if (!isWebAuthnSupported()) {
    showError('Passkeys / WebAuthn not supported on this device/browser.');
    return;
  }

  const errorEl = document.getElementById('accessErrorMsg');
  if (errorEl) errorEl.classList.remove('visible');

  try {
    const challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);

    const savedCredIdHex = localStorage.getItem('adt_master_passkey_id');
    const allowCredentials = savedCredIdHex ? [{
      id: hexToBuffer(savedCredIdHex),
      type: 'public-key'
    }] : [];

    const getOptions = {
      challenge,
      timeout: 60000,
      userVerification: 'preferred'
    };

    if (allowCredentials.length > 0) {
      getOptions.allowCredentials = allowCredentials;
    }

    const assertion = await navigator.credentials.get({
      publicKey: getOptions
    });

    if (assertion) {
      ACCESS_CONTROL.saveGoogleSession(
        ACCESS_CONTROL.TIER_MASTER,
        'master2026',
        {
          name: 'Aaradhya Dev Tamrakar',
          email: 'aaradhyadevtmr@gmail.com',
          authType: 'webauthn_passkey',
          verified: true
        }
      );
      closeAccessModal();
      showToast('👑 Master Admin unlocked via Hardware Authenticator (Passkey)!');
      if (typeof playAudioCue === 'function') playAudioCue('open');
    }
  } catch (err) {
    console.warn('WebAuthn Authentication:', err);
    showError(`Passkey authentication cancelled or failed: ${err.name === 'NotAllowedError' ? 'User cancelled or verification failed.' : (err.message || 'Error')}`);
  }
}

function renderAccessNavButton() {
  const btns = [
    document.getElementById('navAccessBtn'),
    document.getElementById('drawerAccessBtn')
  ].filter(Boolean);

  if (btns.length === 0) return;

  const effTier = ACCESS_CONTROL.getEffectiveTier();
  const isSimulated = ACCESS_CONTROL.simulatedTier !== null;
  const session = ACCESS_CONTROL.getSessionData();
  const isSignedIn = !!(session && session.user);
  const userPic = session?.user?.picture || '';
  const userName = session?.user?.name || 'User';

  btns.forEach(btn => {
    const isDrawer = btn.id === 'drawerAccessBtn';
    btn.className = 'nav-access-btn';
    if (isSignedIn) btn.classList.add('is-signed-in');

    let tierTitle = 'Access Control / Login';
    let defaultSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>`;
    let drawerLabel = isSimulated ? 'Public (Sim)' : 'Access Control / Login';

    if (effTier === ACCESS_CONTROL.TIER_MASTER) {
      btn.classList.add('tier-master');
      tierTitle = `Master Level Active ${session?.user?.email ? '(' + session.user.email + ')' : ''}`;
      defaultSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v2H5v-2z"/>
      </svg>`;
      drawerLabel = isSimulated ? '👑 Master (Sim)' : '👑 Master Level Active';
    } else if (effTier === ACCESS_CONTROL.TIER_VIP) {
      btn.classList.add('tier-vip');
      tierTitle = `Higher Tier (VIP) Active ${session?.user?.email ? '(' + session.user.email + ')' : ''}`;
      defaultSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>`;
      drawerLabel = isSimulated ? 'VIP (Sim)' : 'VIP Access Active';
    }

    let iconContent = defaultSvg;
    if (userPic && /^https?:\/\//i.test(userPic)) {
      const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
      btn.classList.add('has-avatar');
      iconContent = `<img src="${esc(userPic)}" class="nav-user-avatar" alt="${esc(userName)}" referrerpolicy="no-referrer" loading="eager" onerror="this.style.display='none';if(this.nextElementSibling)this.nextElementSibling.style.display='inline-flex';" /><span class="nav-avatar-fallback" style="display:none;">${defaultSvg}</span>`;
    } else {
      btn.classList.remove('has-avatar');
    }

    btn.title = tierTitle;
    if (isDrawer) {
      btn.innerHTML = `<span class="drawer-avatar-wrap">${iconContent}</span><span>${drawerLabel}</span>`;
    } else {
      btn.innerHTML = iconContent;
    }
  });
}

async function updateGatedContentVisibility() {
  const effTier = ACCESS_CONTROL.getEffectiveTier();
  const session = ACCESS_CONTROL.getSessionData();
  const passcode = (session && session.passcode)
    ? session.passcode
    : (effTier === ACCESS_CONTROL.TIER_MASTER ? 'master2026' : 'vip2026');

  // Stealth Mode: Hide Master-exclusive section & divider completely from non-Master users!
  const masterSection = document.getElementById('master-exclusive');
  const masterDivider = document.getElementById('master-divider-1');
  const isMasterActive = (effTier === ACCESS_CONTROL.TIER_MASTER);

  if (masterSection) {
    masterSection.style.display = isMasterActive ? 'block' : 'none';
  }
  if (masterDivider) {
    masterDivider.style.display = isMasterActive ? 'flex' : 'none';
  }

  // Dynamic VIP/Master Links Processor (Gates GitHub Repo links per-link tier; defaults to VIP)
  const vipLinks = document.querySelectorAll('[data-payload-link-id]');
  for (const link of vipLinks) {
    const payloadId = link.dataset.payloadLinkId;
    const linkTierStr = (link.dataset.payloadTier || 'vip').toLowerCase();
    const linkTier = (linkTierStr === 'master' || linkTierStr === '2')
      ? ACCESS_CONTROL.TIER_MASTER
      : ACCESS_CONTROL.TIER_VIP;
    const linkPasscode = (linkTier === ACCESS_CONTROL.TIER_MASTER) ? 'master2026' : 'vip2026';
    const linkTierLabel = (linkTier === ACCESS_CONTROL.TIER_MASTER) ? 'Master' : 'VIP';

    if (effTier < linkTier) {
      delete link.dataset.resolvedHref;
      if (linkTier === ACCESS_CONTROL.TIER_MASTER) {
        // Master-tier links stay fully hidden below Master — no locked teaser shown.
        link.style.display = 'none';
        link.href = '#';
        link.removeAttribute('target');
        link.onclick = (e) => e.preventDefault();
        link.classList.remove('project-link--locked');
      } else {
        link.style.display = '';
        link.href = '#';
        link.removeAttribute('target');
        link.textContent = `🔒 ${link.dataset.linkLabel || 'GitHub Repo'} (${linkTierLabel} Access Required)`;
        link.onclick = (e) => {
          e.preventDefault();
          openAccessModal(linkTier);
          return false;
        };
        link.classList.add('project-link--locked');
      }
    } else {
      link.style.display = '';
      if (!link.dataset.resolvedHref && payloadId && ACCESS_CONTROL_PAYLOADS[payloadId]) {
        const resolved = await decryptHexPayload(ACCESS_CONTROL_PAYLOADS[payloadId], linkPasscode);
        if (resolved) link.dataset.resolvedHref = resolved;
      }
      link.href = link.dataset.resolvedHref || '#';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = link.dataset.linkLabel || 'View on GitHub ↗';
      link.onclick = null;
      link.classList.remove('project-link--locked');
    }
  }

  const elements = document.querySelectorAll('[data-access-tier]');

  for (const el of elements) {
    const requiredStr = (el.dataset.accessTier || 'vip').toLowerCase();
    const requiredTier = (requiredStr === 'master' || requiredStr === '2')
      ? ACCESS_CONTROL.TIER_MASTER
      : ACCESS_CONTROL.TIER_VIP;

    const payloadId = el.dataset.payloadId;
    const isUnlocked = effTier >= requiredTier;

    if (!isUnlocked) {
      // LOCKED: Wipe any decrypted inner body completely from the DOM!
      const inner = el.querySelector('.gated-inner-body');
      if (inner) inner.remove();

      if (!el.querySelector('.gated-overlay')) {
        const tierName = requiredTier === ACCESS_CONTROL.TIER_MASTER ? 'Master Level Access' : 'Higher Tier (VIP) Access';
        const tierDesc = requiredTier === ACCESS_CONTROL.TIER_MASTER
          ? 'This section contains administrative system logs, direct payload keys, and live runtime diagnostics.'
          : 'Some source repositories and supplementary notes are shared selectively. Contact me to discuss the work or request relevant material.';
        const previewBadges = requiredTier === ACCESS_CONTROL.TIER_MASTER
          ? `
            <div style="display:flex;justify-content:center;gap:0.6rem;flex-wrap:wrap;margin:0.8rem 0 1.25rem;">
              <span style="background:rgba(234,179,8,0.06);border:1px solid rgba(234,179,8,0.2);padding:0.25rem 0.6rem;border-radius:4px;font-family:var(--mono);font-size:0.7rem;color:#eab308;">👑 Root Auth Console</span>
              <span style="background:rgba(234,179,8,0.06);border:1px solid rgba(234,179,8,0.2);padding:0.25rem 0.6rem;border-radius:4px;font-family:var(--mono);font-size:0.7rem;color:#eab308;">⚡ Live Diagnostic Stream</span>
            </div>`
          : `
            <div style="display:flex;justify-content:center;gap:0.6rem;flex-wrap:wrap;margin:0.8rem 0 1.25rem;">
              <span style="background:rgba(255,255,255,0.03);border:1px solid var(--line);padding:0.25rem 0.6rem;border-radius:4px;font-family:var(--mono);font-size:0.7rem;color:var(--muted);">🔒 13+ GitHub Repos</span>
              <span style="background:rgba(255,255,255,0.03);border:1px solid var(--line);padding:0.25rem 0.6rem;border-radius:4px;font-family:var(--mono);font-size:0.7rem;color:var(--muted);">🔒 Hardware Schematics</span>
              <span style="background:rgba(255,255,255,0.03);border:1px solid var(--line);padding:0.25rem 0.6rem;border-radius:4px;font-family:var(--mono);font-size:0.7rem;color:var(--muted);">🔒 Full Benchmark Logs</span>
            </div>`;

        const overlay = document.createElement('div');
        overlay.className = 'gated-overlay';
        overlay.innerHTML = `
          <div class="gated-lock-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div class="gated-title">${tierName} Required</div>
          <div class="gated-desc">${tierDesc}</div>
          ${previewBadges}
          <button type="button" class="gated-unlock-btn" onclick="openAccessModal(${requiredTier})">
            <span>Unlock ${requiredTier === ACCESS_CONTROL.TIER_MASTER ? 'Master Access' : 'Higher Tier'}</span> →
          </button>
        `;
        el.appendChild(overlay);
      }
      el.classList.add('gated-content-locked');
      el.classList.remove('gated-content-unlocked');
    } else {
      // UNLOCKED: Decrypt payload in memory using required tier passcode and inject into DOM
      if (!el.querySelector('.gated-inner-body') && payloadId && ACCESS_CONTROL_PAYLOADS[payloadId]) {
        const targetPasscode = (requiredTier === ACCESS_CONTROL.TIER_MASTER) ? 'master2026' : 'vip2026';
        const decryptedHtml = await decryptHexPayload(ACCESS_CONTROL_PAYLOADS[payloadId], targetPasscode);
        if (decryptedHtml) {
          const inner = document.createElement('div');
          inner.className = 'gated-inner-body';
          inner.innerHTML = decryptedHtml;
          el.appendChild(inner);
        }
      }
      const overlay = el.querySelector('.gated-overlay');
      if (overlay) overlay.remove();

      el.classList.remove('gated-content-locked');
      el.classList.add('gated-content-unlocked');
    }
  }
}

function renderAccessModal() {
  if (document.getElementById('accessModalOverlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'accessModalOverlay';
  overlay.className = 'access-modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Access Control Login');

  overlay.innerHTML = `
    <div class="access-modal-card" id="accessModalCard">
      <div class="access-modal-header">
        <div class="access-modal-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span>Access Control</span>
        </div>
        <button type="button" class="access-modal-close" id="accessModalClose" aria-label="Close modal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="access-field-group">
        <label class="access-label" for="accessPassInput">Enter Passcode</label>
        <div class="access-input-wrap">
          <input type="text" id="accessPassInput" class="access-input access-input-masked" placeholder="Enter access passcode…" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" data-lpignore="true" data-1p-ignore="true" data-bwignore="true" data-form-type="other" name="access-code-field-x9k2" />
          <button type="button" class="access-pass-toggle" id="accessPassToggle" aria-label="Toggle password visibility">
            <svg id="accessEyeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="access-hint-box" id="accessHintBox">
        <strong>Demo Sandbox Passcode:</strong> <code>vip2026</code>
        <div style="font-size: 0.72rem; opacity: 0.78; margin-top: 0.25rem;">Interactive Client-Side AES-GCM Decryption Test</div>
      </div>

      <div class="access-error-msg" id="accessErrorMsg"></div>

      <div class="access-actions">
        <button type="button" class="access-btn-submit" id="accessSubmitBtn">Unlock Access</button>
        <button type="button" class="access-btn-logout" id="accessLogoutBtn" hidden>Lock Session</button>
      </div>

      <div class="access-divider"><span>Or Sign In With Google / Passkey</span></div>
      <div class="google-btn-wrap" id="googleSignInBtnWrap"></div>
      <div class="passkey-btn-wrap" id="passkeyBtnWrap" style="margin-top: 0.6rem; text-align: center;">
        <button type="button" class="access-btn-passkey" id="accessPasskeyBtn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
            <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 8V7a3 3 0 0 1 6 0v3H9z"/>
          </svg>
          <span>Sign In with Passkey / Hardware Key</span>
        </button>
      </div>
      <div id="masterGoogleClientWrap" style="text-align: center; margin-top: 0.4rem; display: none;">
        <button type="button" onclick="promptForGoogleClientId()" style="background: none; border: none; color: var(--muted); font-size: 0.68rem; font-family: var(--mono); cursor: pointer; text-decoration: underline;">
          ⚙️ Setup Google OAuth Client ID
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Bind modal event listeners once on DOM creation
  const closeBtn = document.getElementById('accessModalClose');
  const submitBtn = document.getElementById('accessSubmitBtn');
  const passToggle = document.getElementById('accessPassToggle');
  const eyeIcon = document.getElementById('accessEyeIcon');
  const logoutBtn = document.getElementById('accessLogoutBtn');
  const passInput = document.getElementById('accessPassInput');
  const card = document.getElementById('accessModalCard');

  if (closeBtn) closeBtn.addEventListener('click', closeAccessModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeAccessModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeAccessModal();
    }
  });

  if (passToggle && passInput && eyeIcon) {
    passToggle.addEventListener('click', () => {
      const isMasked = passInput.classList.contains('access-input-masked');
      passInput.classList.toggle('access-input-masked', !isMasked);
      eyeIcon.style.opacity = isMasked ? '1' : '0.6';
    });
  }

  function handleAuthenticate() {
    const val = passInput ? passInput.value : '';
    const activeTab = document.querySelector('.access-tab-btn.active');
    const activeTabTier = activeTab ? parseInt(activeTab.dataset.tier, 10) : 1;
    if (!val) {
      showError('Please enter a passcode.');
      return;
    }

    const res = ACCESS_CONTROL.authenticate(val, activeTabTier);
    if (res.success) {
      closeAccessModal();
      if (passInput) passInput.value = '';
      showToast(`Unlocked ${res.label} successfully!`);
    } else {
      showError(res.error);
      if (card) {
        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 400);
      }
    }
  }

  if (submitBtn) submitBtn.addEventListener('click', handleAuthenticate);
  if (passInput) passInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleAuthenticate(); });

  const passkeyBtn = document.getElementById('accessPasskeyBtn');
  if (passkeyBtn) {
    passkeyBtn.addEventListener('click', authenticateWithPasskey);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      ACCESS_CONTROL.logout();
      closeAccessModal();
      showToast('Session locked. Reverted to public guest access.');
    });
  }

  renderGoogleSignInButton();
}

function openAccessModal(defaultTier = 1) {
  renderAccessModal();
  const overlay = document.getElementById('accessModalOverlay');
  const passInput = document.getElementById('accessPassInput');
  const errorMsg = document.getElementById('accessErrorMsg');
  const logoutBtn = document.getElementById('accessLogoutBtn');
  const hintBox = document.getElementById('accessHintBox');

  if (errorMsg) errorMsg.classList.remove('visible');
  if (passInput) passInput.value = '';

  const actTier = ACCESS_CONTROL.getActualTier();
  const effTier = ACCESS_CONTROL.getEffectiveTier();

  const masterGoogleClientWrap = document.getElementById('masterGoogleClientWrap');
  if (masterGoogleClientWrap) {
    masterGoogleClientWrap.style.display = (effTier === ACCESS_CONTROL.TIER_MASTER) ? 'block' : 'none';
  }

  // Stealth Mode: Hide Master demo passcode in Guest mode!
  if (hintBox) {
    hintBox.innerHTML = `
      <strong>Demo Sandbox Passcode:</strong> <code>vip2026</code>
      <div style="font-size: 0.72rem; opacity: 0.78; margin-top: 0.25rem;">Interactive Client-Side AES-GCM Decryption Test</div>
    `;
  }

  if (logoutBtn) logoutBtn.hidden = (actTier === ACCESS_CONTROL.TIER_PUBLIC);

  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (passInput) passInput.focus();
  renderGoogleSignInButton();
  if (typeof playAudioCue === 'function') playAudioCue('open');
}

function closeAccessModal() {
  const overlay = document.getElementById('accessModalOverlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (typeof playAudioCue === 'function') playAudioCue('close');
  }
}

function showError(msg) {
  const el = document.getElementById('accessErrorMsg');
  if (el) {
    el.textContent = msg;
    el.classList.add('visible');
  }
  if (typeof playAudioCue === 'function') playAudioCue('error');
}

function showToast(msg) {
  let toast = document.getElementById('accessToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'accessToast';
    toast.style.cssText = 'position:fixed;bottom:2rem;right:2rem;z-index:10001;background:var(--heading);color:var(--bg);padding:0.75rem 1.2rem;border-radius:8px;font-family:var(--mono);font-size:0.78rem;box-shadow:0 10px 25px rgba(0,0,0,0.3);transition:opacity 0.3s, transform 0.3s;opacity:0;transform:translateY(10px);pointer-events:none;';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 2800);
}

function renderMasterControlPanel() {
  const actTier = ACCESS_CONTROL.getActualTier();
  let panel = document.getElementById('masterPanelWidget');

  if (actTier !== ACCESS_CONTROL.TIER_MASTER) {
    if (panel) panel.style.display = 'none';
    return;
  }

  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'masterPanelWidget';
    panel.className = 'master-panel-widget';
    panel.innerHTML = `
      <button type="button" class="master-toggle-btn" id="masterToggleBtn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v2H5v-2z"/>
        </svg>
        <span>Master Control</span>
      </button>
      <div class="master-card-popup" id="masterCardPopup">
        <div class="master-pop-header">
          <span class="master-pop-title">👑 Master Admin Panel</span>
          <button type="button" class="access-modal-close" id="masterPopClose" style="padding:0.2rem;">✕</button>
        </div>
        <div>
          <div class="master-sim-label">Simulate Visitor Tier</div>
          <div class="master-sim-group">
            <button type="button" class="master-sim-btn" data-sim="0">Public</button>
            <button type="button" class="master-sim-btn" data-sim="1">VIP</button>
            <button type="button" class="master-sim-btn" data-sim="2">Master</button>
          </div>
        </div>
        <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:0.6rem;display:flex;flex-direction:column;gap:0.4rem;">
          <div class="master-stat-row"><span>Session:</span> <span>Active Master</span></div>
          <div class="master-stat-row"><span>Gated Nodes:</span> <span id="masterGatedCount">0</span></div>
          <div class="master-stat-row"><span>Search Index:</span> <span id="masterSearchCount">0</span></div>
        </div>

        <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:0.6rem;">
          <div class="master-sim-label" style="display:flex;justify-content:space-between;align-items:center;">
            <span>VIP Email Allowlist</span>
            <button type="button" onclick="promptAddVipEmail()" style="background:rgba(45,212,191,0.15);border:1px solid #2dd4bf;color:#2dd4bf;padding:0.15rem 0.4rem;font-size:0.6rem;border-radius:4px;cursor:pointer;">+ Add Email</button>
          </div>
          <div id="masterVipListWrap" style="margin-top:0.3rem;max-height:80px;overflow-y:auto;font-family:var(--mono);font-size:0.65rem;color:var(--muted);display:flex;flex-direction:column;gap:0.2rem;"></div>
        </div>

        <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:0.5rem;display:flex;flex-direction:column;gap:0.35rem;">
          <button type="button" id="masterEnrollPasskeyBtn" onclick="registerMasterPasskey()" style="background:rgba(59,130,246,0.12);border:1px solid rgba(59,130,246,0.4);color:#93c5fd;padding:0.25rem 0.5rem;font-size:0.62rem;font-family:var(--mono);border-radius:4px;cursor:pointer;width:100%;display:flex;align-items:center;justify-content:center;gap:0.35rem;">
            <span>🔑 Enroll Hardware Passkey (FIDO2)</span>
          </button>
          <button type="button" onclick="promptForGoogleClientId()" style="background:rgba(250,204,21,0.12);border:1px solid rgba(250,204,21,0.4);color:#fef08a;padding:0.25rem 0.5rem;font-size:0.62rem;font-family:var(--mono);border-radius:4px;cursor:pointer;width:100%;">
            ⚙️ Configure Google OAuth Client ID
          </button>
        </div>

        <button type="button" class="access-btn-logout" id="masterLockBtn" style="padding:0.4rem;width:100%;">
          Lock Master Session
        </button>
      </div>
    `;
    document.body.appendChild(panel);

    const toggleBtn = document.getElementById('masterToggleBtn');
    const popup = document.getElementById('masterCardPopup');
    const closeBtn = document.getElementById('masterPopClose');
    const lockBtn = document.getElementById('masterLockBtn');
    const simBtns = popup.querySelectorAll('.master-sim-btn');

    toggleBtn.addEventListener('click', () => popup.classList.toggle('open'));
    closeBtn.addEventListener('click', () => popup.classList.remove('open'));

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && popup.classList.contains('open')) {
        popup.classList.remove('open');
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'M' || e.key === 'm')) {
        if (ACCESS_CONTROL.getActualTier() === ACCESS_CONTROL.TIER_MASTER) {
          e.preventDefault();
          popup.classList.toggle('open');
        }
      }
    });

    simBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetSim = parseInt(btn.dataset.sim, 10);
        ACCESS_CONTROL.setSimulatedTier(targetSim === ACCESS_CONTROL.TIER_MASTER ? null : targetSim);
        showToast(`Simulating Tier: ${targetSim === 0 ? 'Public' : targetSim === 1 ? 'VIP' : 'Master'}`);
      });
    });

    lockBtn.addEventListener('click', () => {
      ACCESS_CONTROL.logout();
      showToast('Master session locked.');
    });
  }

  panel.style.display = 'block';

  const popup = document.getElementById('masterCardPopup');
  const simBtns = popup.querySelectorAll('.master-sim-btn');
  const effTier = ACCESS_CONTROL.getEffectiveTier();

  simBtns.forEach(btn => {
    const bTier = parseInt(btn.dataset.sim, 10);
    btn.classList.toggle('active', bTier === effTier);
  });

  const gatedCount = document.querySelectorAll('[data-access-tier]').length;
  const masterGatedCount = document.getElementById('masterGatedCount');
  if (masterGatedCount) masterGatedCount.textContent = gatedCount;

  const masterSearchCount = document.getElementById('masterSearchCount');
  if (masterSearchCount && window.SEARCH_STATIC_INDEX) {
    const total = (SEARCH_STATIC_INDEX.achievement || []).length + (SEARCH_STATIC_INDEX.project || []).length;
    masterSearchCount.textContent = total;
  }

  // Render Custom VIP Emails List
  const vipWrap = document.getElementById('masterVipListWrap');
  if (vipWrap) {
    const customList = getCustomVipEmails();
    if (customList.length === 0) {
      vipWrap.innerHTML = `<span style="color:#71717a;font-style:italic;">No custom VIP emails added yet (Wildcard '*' active).</span>`;
    } else {
      const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
      vipWrap.innerHTML = customList.map(email => `
        <div style="display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,0.03);padding:0.2rem 0.4rem;border-radius:4px;">
          <span>${esc(email)}</span>
          <button type="button" class="vip-remove-btn" data-email="${esc(email)}" style="background:none;border:none;color:#ef4444;cursor:pointer;font-size:0.65rem;" title="Remove VIP Access">✕</button>
        </div>
      `).join('');
      vipWrap.querySelectorAll('.vip-remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetEmail = btn.getAttribute('data-email');
          if (targetEmail) removeCustomVipEmail(targetEmail);
        });
      });
    }
  }
}


function initAccessControl() {
  renderAccessNavButton();
  updateGatedContentVisibility();
  renderMasterControlPanel();
}

// Global & ESM Exports
window.openAccessModal = openAccessModal;
window.closeAccessModal = closeAccessModal;
window.registerMasterPasskey = registerMasterPasskey;
window.authenticateWithPasskey = authenticateWithPasskey;
window.isWebAuthnSupported = isWebAuthnSupported;
window.bufferToHex = bufferToHex;
window.hexToBuffer = hexToBuffer;
