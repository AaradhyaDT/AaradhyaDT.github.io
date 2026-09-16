/* ============================================================
   MODULE: access.js — aaradhyadt.github.io (v54.6)
   Access control, VIP gates, and Google OAuth integration.
   ============================================================ */

/* ── Encrypted Payload Data Store (Zero-leak AES-256-GCM) ───── */
const ACCESS_CONTROL_PAYLOADS = {
  "index-vip": "6cfee78c5a3d920a707a92a7c6d064a54f5719d3ef3ebe55603eed4d9aaef3b18eef0db305b9890686a21ac3b12beb42c759f968f07bbb43fd57233d44cfce83b5c0779f76fe5bcde97168b827057a7b9af21bafe70f5ed38383aac19f83d83bcbfedfa51b97bede507ce1500073a66653ee081894fc91c7987b8a255339c7ede006d010295e6200a63bb044742a466ae6b72fe6f1e7e571933c757e63132ba2d869277b531942aeb082a4408165e002c21636f2d7b57eee365356e932343c4a386d54af75c0391d483cb9b5fedcbce96574d3c691b6b22f94ddb7e192d356c23b2d805ff93bb260971171ac92fb61c52fac77b3523699be4b8b47aced5966facc3cf422e3338072fcedfd96260ee87b0e39e14cc6d9cd3136a3787a5741879564fea76456d6b6a79cd991455da8e1d8fd659789923c6796627ceabd9c113192279da6f241834acd3cc9453b2325507efabe5e4891af847ce17771ef1e5c4e96fb8571bce0b971d87a50ab9e4cc6e7264cf01bd85f7fc1f3bf6c5098fec0c87cabaf29d636dd71b0359c8d68e6efff42c4f603bba2d4ef20fe2b30a22e9ab1942075fbaa456cc2b155f6a4787a6696ab7a8da218ca711e13cad994495eec02523640a699a28496d581882f068d162c2071c7c3ba469c11ef1b70797a68b51a9f9011e78d0627347903375ccd43485d56cd791b2c977bdbea7c3ad4fe6a47e0bee61ccfaf376a58efa9ce379db61f74c73e693b861cd6447478fdcb0682ff36597290a4e018354acfa2b0233a9fbda823ffdb33e569338b4d69887fcdae47ed12109ae30626c709bda566c0cd6a1cd41569c972ba5600a27d56c074c0dc494843367ed0fa00260081e1e4c3fd49a134b97943f959777ba6dc350ac5da6d56ff0b7e855431297446d17e11059638f6816b677226daba464e869155afccce3b8cee2c7ec7fd3b2894bf027cc3666e9fc5a736a99ec31543ebd646172f18689a54d896a891bd9811ab990daf9ceef41ff72d161e3f52e351264c6e28370d412df90a155b78ac197b024b4040b59743ea8f551cf4155119b4b177abf4c8fec80aa8edbfb677b15eae36b11a26c01346d1140df36c615db3c7e98a2bdc58a0ebceaa6ceff589dde728a548ba8c801358480887cc1ca2bf5d598179482c277f2fd7ec61a8f8ffb77d072d3b490855d8e82749d0ceb6d34ad31615b0211dc54bcd71f24d3849cf94f6d44b86a2a047fb3dff71f5e450f89ebff2d86dfcc85aa235c04b35baf6e8929eb9ec993b9c29387a7d2cf966f6b93ebddb42adc5b91f8df4b2f8a30126a6e49e4eab506d1cb2b03709b4301daf56f2eb26c2c3125e62dc82aeb8d1a849df574ff79e82c082bd866e159d62b8dc638f73a695cd5cea2e46f4872b9ee72ba5fd217a81fe97950204d4103aa48b2dc40eab3178bd1193d64f4696533f28b15a5ff262fb6ee690cdc9ab34cf32115118b4632c2f88609dd714853643a6adaf704a2ff5c26182d893339b45ac80e1c1b25ece7b199619b7eaba941a61d4d9c54a0dffa9fc87282111b9cb80a8eead25f35fa7c826e09c05ba829a8c126ba5dd7eff7415b132b0d4e47479111af93a84b6697e92199376b71d4dca40d1f181adafd28cf4f77386cae59ed19010d80c89592ec05a1841f5055ec6b1315f3c590f68bea1f25308a278afda48f70714ea7ecba9f704bfa76c964ab4791b61d22a2c148036f495319b16f6b7b42f68f9f06f922a668c9a280dee9943fe5ebeaaa697a76bbbfff001e7730344793e39a4d82a312b7ae9995a7d6c67d0520f4f52b05122ceaad7764b34598992263d14214f7416b17edd1dbb10a5f0063a935a7b14b519d5b6febb7fe0145d1c60b17dc69e8999e8b879765011b2a9f053bb1acf6021b74f95e7b006cb5f4f4242bef9776350532d93ad35132105fc416023965ba8b5140c5acb2a1ae9eb75ebc1253af261ef75157b51330dc3ad96e33dceb422bcad593bb8bd5c403a99c555e82876e68bb784230d33acb02ed56c698ea21921a1080516d9cf0e4d6caa2b28d04aa075f6b9c02f355e86d38cbcca36c382552ec76ff6e075b317d4d0e2c0e2075513abd4bf0b41df890fcfece284d763e575df401c69cb93353df7777e87413c1bdffa20392646f8f4f49887e1be427a545e06c2fa93780b951703dad70c26d0ebf89eb0372148b00555731a494901047b856cfaa36d105f77eee829b554d516ef14c5d42bc5ca429edc32d58f7bc729a9ee58fc5f6d94f41d98de3663a12461889c3df4286fd47a4b50ae5712f639412fc120930e9750fa7c519cc48732ec77e03bd51e432d9ce582d53e3ab13b30a88f8865f79133eecfb20650279e2ed0c6fac9f85e729a6f555787d68910ec2a59bdb7c71a3cb05e7a1c7d2f8aa7b1c7f5794e04f5033bcc6298aa8596f155f56f2c00f6cb5b34908a83f507f12f11a9e93ff3938930821d398e968cc1ed98faa6f58a3b1ba5cfe5b4597938a08e48544662496906a5cafc7c7237ffd5e22b7913c955a542280f8d2205bdff5f919e2d802a9387917751068db735a193cca4ebd03bb48c39c091feba0573a5011fe3667160f579cb5d1048f9dec36d123d161840747e6c771411496f962c3d615a125d9a2ab8516d617cf5fa1e5c1c228718ecaac2c87c00263c9c2b7c34a06c0a709fd18ada4ab7a70f3892c26bd0e948e02cd07230d15112b60a11064091479b8e1fbe05ba7d8e06b0e5bc6048a47e8869d611cf7558f497b4b3276c499022e0a55f2b322a298e2cfdc8b6f0fcc3d7eeccb503245141b2f88552cf3ee272f8c1457a00cd39afbae999d3e6cb8f8d15f419b90daa86bb097deb783b70296be5bd44758c214e98e1e588ea8dd1d9ba8e12da569f148e20edf561c498205d373e79a2cde0eb37a11d04f0c9c546b970f7e3da10cbd4fcbc88b7a7b5a27be5a2219fa0bf36a80de1042196cbddfa3fe7c5d8ab4971c0cbd21c2de54de1f9a0c29a8767ba4d16d8a2e09a09782eb8675c66704f2b6623c072948bf0533f3acc395958b6a342e217318eb64a13d1c8eeb646c8bb74557ef41786d5baf8c61a81746e6e43c9413d9f34c966c95262022c62580474379e6e6be2eb0173a2a2d447dbd2a6aa6f1f1938112036aa9d0064b36ad1e813f040427771ea8f1a204b6c8a0aec00dc1985b88ee7b9da22fe4f73e4b59e86cf870488362d1924838c2e2571d3a732ef5acb0118419b00d4c8e50836c72958614dc6",
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
  "proj-biasaperture": "52d691c593300958cde595ebd168168f04acf6f324006d01ca692a2ff655016d81124500366ddc18266210188bf57e46ae0f4f2f672794e81398624ca9ef9d71cbac91701f62",
  "proj-brainstorm": "6812752c1acca40a87941b756b9e2da6aff20fa0b75fea8ad2102d9934ff64504ba069401428436f3d0c4b52bf6e650f39c74bfa28ee5e47912875a44d0592eb233b7d5eb3a7a30b7e84a408f0633b",
  "proj-super-nlm": "2963c6c84a7fd7cd7dd6cb4099db4da7f4eb02c814933afd72f92dfde4fd8a6df3fc40806e3de7d5874f3b05a59167b882103a646a34cb04f9528a64fb3c1893416bd5d8c49552e542642c02eda7",
  "proj-github-pilot": "8910c900f526370d1f178458a577c8b6416543b355fa305c6bdfe603b0ad9a5e37478e9348da73d2c2322374bd08c928948fd7ecf4c833df635d8ff4aa6056b1a5ec5ee14bbd9c53a476503413f469be35",
  "proj-windows-pilot": "04cf775837bcb6d8d3d240110864b1e721e9d1345bfe1497acff69c1624bff34237075c075546085b4cad9915b12788f9b7ee926dc45128c4201b8ea1d25aece5b33acea0b7380"
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
        link.innerHTML = `🔒 GitHub Repo (${linkTierLabel} Access Required)`;
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
      link.innerHTML = 'View on GitHub ↗';
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
          : 'Unlock confidential GitHub source code links, extended performance benchmarks, and private architecture specifications.';
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
        <strong>Access Passcode:</strong> <code>vip2026</code>
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
  renderGoogleSignInButton();
}

function openAccessModal(defaultTier = 1) {
  renderAccessModal();
  const overlay = document.getElementById('accessModalOverlay');
  const passInput = document.getElementById('accessPassInput');
  const errorMsg = document.getElementById('accessErrorMsg');
  const logoutBtn = document.getElementById('accessLogoutBtn');
  const hintBox = document.getElementById('accessHintBox');
  const card = document.getElementById('accessModalCard');
  const passkeyBtn = document.getElementById('accessPasskeyBtn');

  if (passkeyBtn) {
    passkeyBtn.addEventListener('click', authenticateWithPasskey);
  }

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
      <strong>Access Passcode:</strong> <code>vip2026</code>
    `;
  }

  // Secret 5-click trigger on modal title
  const closeBtn = document.getElementById('accessModalClose');
  const submitBtn = document.getElementById('accessSubmitBtn');
  const passToggle = document.getElementById('accessPassToggle');
  const eyeIcon = document.getElementById('accessEyeIcon');

  closeBtn.addEventListener('click', closeAccessModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeAccessModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeAccessModal();
    }
  });

  passToggle.addEventListener('click', () => {
    const isMasked = passInput.classList.contains('access-input-masked');
    passInput.classList.toggle('access-input-masked', !isMasked);
    eyeIcon.style.opacity = isMasked ? '1' : '0.6';
  });

  function handleAuthenticate() {
    const val = passInput.value;
    const activeTab = document.querySelector('.access-tab-btn.active');
    const activeTabTier = activeTab ? parseInt(activeTab.dataset.tier, 10) : 1;
    if (!val) {
      showError('Please enter a passcode.');
      return;
    }

    const res = ACCESS_CONTROL.authenticate(val, activeTabTier);
    if (res.success) {
      closeAccessModal();
      passInput.value = '';
      showToast(`Unlocked ${res.label} successfully!`);
    } else {
      showError(res.error);
      card.classList.add('shake');
      setTimeout(() => card.classList.remove('shake'), 400);
    }
  }

  submitBtn.addEventListener('click', handleAuthenticate);
  passInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleAuthenticate(); });

  if (logoutBtn) logoutBtn.hidden = (actTier === ACCESS_CONTROL.TIER_PUBLIC);
  logoutBtn.addEventListener('click', () => {
    ACCESS_CONTROL.logout();
    closeAccessModal();
    showToast('Session locked. Reverted to public guest access.');
  });

  overlay.classList.add('open');
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
