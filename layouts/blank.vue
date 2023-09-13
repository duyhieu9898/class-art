<template>
  <div>
    <div class="flex flex-col min-h-screen">
      <slot name="header">
        <Navbar light></Navbar>
      </slot>
      <div class="relative flex-1 flex flex-col w-full h-full">
        <slot />
      </div>
    </div>
    <slot name="app-after" />
    <div id="app-after"></div>
  </div>
</template>
