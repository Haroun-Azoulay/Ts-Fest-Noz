import { afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import SigninView from "@/composables/Authentification/SigninPage.vue";
import { mount, shallowMount } from "@vue/test-utils";
import { useRouter } from 'vue-router';
import { nextTick } from 'vue';
import ApiService from '@/services/ApiService';
import HomeView from '@/views/Home/HomeView.vue';

vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
  useRoute: vi.fn(),
}));

vi.mock('@/services/ApiService', () => ({
  default: {
    post: vi.fn(),
  },
}));

describe('SigninView.vue', () => {
  it('1 - should return true if login form fields exist', async () => {
    const mockRouterPush = vi.fn();
    const mockRouterAfterEach = vi.fn();
    useRouter.mockReturnValue({
      push: mockRouterPush,
      afterEach: mockRouterAfterEach,
    });
    const wrapper = mount(SigninView);
    const loginPseudo = wrapper.find('[data-test="loginPseudo"]');
    const loginPassword = wrapper.find('[data-test="loginPassword"]');
    expect(loginPseudo.exists()).toBe(true);
    expect(loginPassword.exists()).toBe(true);
  });
  it('2 - should redirect to Home page after successful login', async () => {
    const mockRouterPush = vi.fn();
    const mockRouterAfterEach = vi.fn();
    useRouter.mockReturnValue({
      push: mockRouterPush,
      afterEach: mockRouterAfterEach,
    });
    ApiService.post.mockResolvedValue({
      data: { token: 'fake-jwt-token' },
    });
    const wrapper = mount(SigninView);
    const loginPseudo = wrapper.find('[data-test="loginPseudo"]');
    const loginPassword = wrapper.find('[data-test="loginPassword"]');
    const submitLoginForm = wrapper.find('[data-test="submitLoginForm"]');
    expect(loginPseudo.exists()).toBe(true);
    expect(loginPassword.exists()).toBe(true);
    expect(submitLoginForm.exists()).toBe(true);
    await loginPseudo.setValue('test');
    await loginPassword.setValue('test');
    await submitLoginForm.trigger('click');
    await nextTick();
    expect(mockRouterPush).toHaveBeenCalledWith({ path: '/' });
  });
  it('3 - should not redirect to Home page after failed login', async () => {
    const mockRouterPush = vi.fn();
    const mockRouterAfterEach = vi.fn();
    useRouter.mockReturnValue({
      push: mockRouterPush,
      afterEach: mockRouterAfterEach,
    });
    ApiService.post.mockResolvedValue({
    });
    const wrapper = mount(SigninView);
    const loginPseudo = wrapper.find('[data-test="loginPseudo"]');
    const loginPassword = wrapper.find('[data-test="loginPassword"]');
    const submitLoginForm = wrapper.find('[data-test="submitLoginForm"]');
    expect(loginPseudo.exists()).toBe(true);
    expect(loginPassword.exists()).toBe(true);
    expect(submitLoginForm.exists()).toBe(true);
    await loginPseudo.setValue('rokrzhpojdiojdoiqjdiajeijehpoiajhopaheapojhea');
    await loginPassword.setValue('z^hepkzpoehzohpzhoprjzhopjzrhopjrzhopjrz');
    await submitLoginForm.trigger('click');
    await nextTick();
    expect(mockRouterPush).toHaveBeenCalledTimes(0);
  });
})
