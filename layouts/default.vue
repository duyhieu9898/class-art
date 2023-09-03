<template>
  <div>
    <slot name="app-before" />

    <div class="flex flex-col min-h-screen">
      <slot name="header">
        <Navbar></Navbar>
      </slot>
      <div class="flex-1 flex flex-col w-full h-full">
        <slot />
      </div>
      <slot name="footer">
        <Footer />
      </slot>
    </div>
    <slot name="app-after" />
    <div id="app-after"></div>
  </div>
</template>
